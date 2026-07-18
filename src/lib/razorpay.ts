import "server-only";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

export interface Plan {
	id: string;
	name: string;
	subtotal: number;
	gstPercent: number;
	total: number;
	duration: string;
	category: string;
	active: boolean;
	sortOrder: number;
}

export interface PaymentDoc {
	userId: string;
	planId: string;
	planName: string;
	subtotal: number;
	gstPercent: number;
	gstAmount: number;
	amount: number;
	amountPaise: number;
	razorpayOrderId: string | null;
	razorpayPaymentId: string | null;
	status: "pending" | "completed" | "failed";
	verifiedAt: Date | null;
	createdAt: Date;
}

export async function getPlan(planId: string): Promise<Plan | null> {
	const db = getAdminFirestore();
	const doc = await db.collection("plans").doc(planId).get();
	if (!doc.exists) return null;
	const data = doc.data()!;
	return {
		id: doc.id,
		name: data.name,
		subtotal: data.subtotal,
		gstPercent: data.gstPercent,
		total: data.total,
		duration: data.duration,
		category: data.category,
		active: data.active,
		sortOrder: data.sortOrder,
	};
}

export async function getActivePlans(): Promise<Plan[]> {
	const db = getAdminFirestore();
	const snapshot = await db
		.collection("plans")
		.where("active", "==", true)
		.orderBy("sortOrder")
		.get();
	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	})) as Plan[];
}

// NEW: Writes a payment record to the top-level payments/ collection.
// Each doc stores userId, plan details, GST breakdown, and Razorpay IDs.
// Do NOT confuse with users/{userId}/courses (legacy purchases).
export async function createPaymentDoc(data: {
	userId: string;
	plan: Plan;
	razorpayOrderId: string;
}): Promise<string> {
	const db = getAdminFirestore();
	const gstAmount = Math.round(data.plan.subtotal * (data.plan.gstPercent / 100));
	const ref = await db.collection("payments").add({
		userId: data.userId,
		planId: data.plan.id,
		planName: data.plan.name,
		subtotal: data.plan.subtotal,
		gstPercent: data.plan.gstPercent,
		gstAmount,
		amount: data.plan.total,
		amountPaise: data.plan.total * 100,
		razorpayOrderId: data.razorpayOrderId,
		razorpayPaymentId: null,
		status: "pending",
		verifiedAt: null,
		createdAt: new Date(),
	});
	return ref.id;
}

// NEW: Reads payment records from the top-level payments/ collection,
// filtered by userId. Used by GET /api/payments (session-authenticated).
// For legacy course purchases, use the courses API (/api/courses).
export async function getPaymentsByUser(userId: string): Promise<PaymentDoc[]> {
	const db = getAdminFirestore();
	const snapshot = await db
		.collection("payments")
		.where("userId", "==", userId)
		.orderBy("createdAt", "desc")
		.get();
	return snapshot.docs.map((doc) => {
		const d = doc.data();
		return {
			...d,
			verifiedAt: d.verifiedAt?.toDate?.() || null,
			createdAt: d.createdAt?.toDate?.() || new Date(),
		};
	}) as PaymentDoc[];
}
