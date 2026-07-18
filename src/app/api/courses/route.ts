import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

// LEGACY: Queries users/{userId}/courses subcollection for historical purchases.
// Legacy documents have fields: courseName, duration, price, orderId, courseId.
// These are mapped to the Course interface below for the account page.
// For new Razorpay payment records, see /api/payments.

export async function GET(request: NextRequest) {
	const userId = request.nextUrl.searchParams.get("userId");

	if (!userId) {
		return NextResponse.json({ message: "User ID is required" }, { status: 400 });
	}

	try {
		const firestore = getAdminFirestore();

		const coursesSnapshot = await firestore
			.collection("users")
			.doc(userId)
			.collection("courses")
			.get();

		const courses = coursesSnapshot.docs.map((doc) => {
			const r = doc.data();
			console.log("[courses] found doc:", doc.id, r);
			return {
				id: doc.id,
				name: r.courseName || r.name || "—",
				type: r.type || "Course",
				days: String(r.duration ?? r.days ?? "—"),
				price: r.price?.toString() ?? r.priceAmount?.toString() ?? "—",
				paymentStatus: r.paymentStatus || "verified",
				createdAt: r.createdAt || null,
			};
		});

		return NextResponse.json(courses, { status: 200 });
	} catch (error) {
		console.error("[courses] Error fetching courses:", error);
		return NextResponse.json({ message: "Error fetching courses" }, { status: 500 });
	}
}
