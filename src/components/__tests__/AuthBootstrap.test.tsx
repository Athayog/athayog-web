import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import AuthBootstrap from "../AuthBootstrap";
import useAuthStore from "@/store/useAuthStore";

vi.mock("@/lib/firebase", () => ({
	auth: {
		onAuthStateChanged: vi.fn(),
	},
	db: {},
}));

describe("AuthBootstrap", () => {
	it("triggers initializeAuth on mount and unsubscribes on unmount", () => {
		const unsubscribeMock = vi.fn();
		const initializeAuthSpy = vi.fn(() => unsubscribeMock);

		useAuthStore.setState({ initializeAuth: initializeAuthSpy });

		const { unmount } = render(<AuthBootstrap />);

		expect(initializeAuthSpy).toHaveBeenCalledTimes(1);

		unmount();

		expect(unsubscribeMock).toHaveBeenCalledTimes(1);
	});
});
