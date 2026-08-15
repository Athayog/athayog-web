import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore, verifySessionCookie } from "@/lib/firebaseAdmin";

// LEGACY: Queries users/{userId}/courses subcollection for historical purchases.
// The uid always comes from the verified session cookie — the endpoint never
// trusts a client-supplied userId. Legacy documents have fields: courseName,
// duration, price, orderId, courseId. For new Razorpay payment records, see
// /api/payments.

export async function GET(request: NextRequest) {
	const session = request.cookies.get("__session")?.value;
	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	let uid: string;
	try {
		const decoded = await verifySessionCookie(session);
		if (!decoded) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}
		uid = decoded.uid;
	} catch {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	try {
		const firestore = getAdminFirestore();

		const coursesSnapshot = await firestore
			.collection("users")
			.doc(uid)
			.collection("courses")
			.get();

		const courses = coursesSnapshot.docs.map((doc) => {
			const r = doc.data();
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
