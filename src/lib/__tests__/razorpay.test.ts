import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("server-only", () => ({}));

const mockDb = vi.hoisted(() => {
	const mockAdd = vi.fn().mockResolvedValue({ id: "new-doc-id" });
	const mockGet = vi.fn();
	const mockWhere = vi.fn();
	const mockOrderBy = vi.fn();
	const mockDoc = vi.fn();
	const mockLimit = vi.fn();

	mockWhere.mockReturnValue({
		orderBy: mockOrderBy,
		get: mockGet,
		limit: mockLimit,
		where: mockWhere,
	});
	mockOrderBy.mockReturnValue({ get: mockGet });
	mockLimit.mockReturnValue({ get: mockGet });
	mockDoc.mockReturnValue({ get: mockGet });

	return { mockAdd, mockGet, mockWhere, mockOrderBy, mockDoc, mockLimit };
});

vi.mock("@/lib/firebaseAdmin", () => ({
	getAdminFirestore: () => ({
		collection: (name: string) => {
			if (name === "plans") {
				return {
					doc: mockDb.mockDoc,
					where: mockDb.mockWhere,
					orderBy: mockDb.mockOrderBy,
					get: mockDb.mockGet,
				};
			}
			return {
				doc: mockDb.mockDoc,
				where: mockDb.mockWhere,
				orderBy: mockDb.mockOrderBy,
				get: mockDb.mockGet,
				add: mockDb.mockAdd,
			};
		},
	}),
}));

import {
	getPlan,
	getActivePlans,
	createPaymentDoc,
	getPaymentsByUser,
} from "@/lib/razorpay";

describe("razorpay", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	describe("getPlan", () => {
		it("returns plan when doc exists", async () => {
			mockDb.mockGet.mockResolvedValue({
				exists: true,
				id: "group-drop-in",
				data: () => ({
					name: "Drop-in",
					subtotal: 599,
					gstPercent: 5,
					total: 629,
					duration: "single class",
					category: "group-class",
					active: true,
					sortOrder: 1,
				}),
			});

			const plan = await getPlan("group-drop-in");
			expect(plan).not.toBeNull();
			expect(plan?.name).toBe("Drop-in");
		});

		it("returns null when doc does not exist", async () => {
			mockDb.mockGet.mockResolvedValue({ exists: false });
			const plan = await getPlan("nonexistent");
			expect(plan).toBeNull();
		});
	});

	describe("getActivePlans", () => {
		it("returns active plans", async () => {
			mockDb.mockGet.mockResolvedValue({
				docs: [
					{
						id: "group-drop-in",
						data: () => ({
							name: "Drop-in",
							subtotal: 599,
							gstPercent: 5,
							total: 629,
							duration: "single",
							category: "group-class",
							active: true,
							sortOrder: 1,
						}),
					},
				],
			});

			const plans = await getActivePlans();
			expect(plans).toHaveLength(1);
		});

		it("returns empty array when no plans", async () => {
			mockDb.mockGet.mockResolvedValue({ docs: [] });
			const plans = await getActivePlans();
			expect(plans).toHaveLength(0);
		});
	});

	describe("createPaymentDoc", () => {
		it("writes payment doc with GST", async () => {
			const plan = {
				id: "group-1-month",
				name: "1 Month",
				subtotal: 4999,
				gstPercent: 5,
				total: 5249,
				duration: "30 days",
				category: "group-class",
				active: true,
				sortOrder: 2,
			};
			await createPaymentDoc({
				userId: "user123",
				plan,
				razorpayOrderId: "order_xxx",
			});
			expect(mockDb.mockAdd).toHaveBeenCalledWith(
				expect.objectContaining({
					userId: "user123",
					gstAmount: 250,
					status: "pending",
				}),
			);
		});
	});

	describe("getPaymentsByUser", () => {
		it("returns payments for user", async () => {
			mockDb.mockGet.mockResolvedValue({
				docs: [
					{
						data: () => ({
							userId: "user123",
							planName: "Drop-in",
							amount: 629,
							status: "completed",
							createdAt: { toDate: () => new Date("2025-01-01") },
							verifiedAt: null,
						}),
					},
				],
			});

			const payments = await getPaymentsByUser("user123");
			expect(payments).toHaveLength(1);
			expect(payments[0].planName).toBe("Drop-in");
		});

		it("returns empty when no payments", async () => {
			mockDb.mockGet.mockResolvedValue({ docs: [] });
			const payments = await getPaymentsByUser("nobody");
			expect(payments).toHaveLength(0);
		});
	});
});
