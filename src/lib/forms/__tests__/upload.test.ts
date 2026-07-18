import { describe, it, expect, vi } from "vitest";

const mockUploadBytes = vi.fn();
const mockGetDownloadURL = vi.fn();

vi.mock("firebase/storage", () => ({
	ref: (s: unknown, path: string) => ({ storage: s, path }),
	uploadBytes: (...args: unknown[]) => mockUploadBytes(...args),
	getDownloadURL: (...args: unknown[]) => mockGetDownloadURL(...args),
}));

vi.mock("@/lib/firebase", () => ({
	storage: {},
}));

import { uploadFormFile } from "../upload";

describe("uploadFormFile", () => {
	it("uploads a file and returns a download URL", async () => {
		const file = new File(["test"], "my-resume.pdf", { type: "application/pdf" });
		const fakeRef = { storage: {}, path: "uploads/123_my-resume.pdf" };
		const fakeSnapshot = { ref: fakeRef };

		mockUploadBytes.mockResolvedValue(fakeSnapshot);
		mockGetDownloadURL.mockResolvedValue(
			"https://storage.url/uploads/123_my-resume.pdf",
		);

		const url = await uploadFormFile(file);
		expect(url).toBe("https://storage.url/uploads/123_my-resume.pdf");
		expect(mockUploadBytes).toHaveBeenCalled();
		expect(mockGetDownloadURL).toHaveBeenCalledWith(fakeRef);
	});

	it("sanitizes unsafe characters in file name", async () => {
		const file = new File(["x"], "../hack;script.js", { type: "application/pdf" });
		mockUploadBytes.mockResolvedValue({ ref: { storage: {}, path: "" } });
		mockGetDownloadURL.mockResolvedValue("url");

		await uploadFormFile(file);
		const path = mockUploadBytes.mock.calls[0][1];
		expect(path).not.toContain("..");
		expect(path).not.toContain(";");
	});

	it("rejects when upload fails", async () => {
		const file = new File(["x"], "file.pdf", { type: "application/pdf" });
		mockUploadBytes.mockRejectedValue(new Error("Upload failed"));

		await expect(uploadFormFile(file)).rejects.toThrow("Upload failed");
	});
});
