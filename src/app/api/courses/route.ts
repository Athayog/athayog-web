import { NextRequest, NextResponse } from "next/server";
import { getAdminFirestore } from "@/lib/firebaseAdmin";

// LEGACY: Queries users/{userId}/courses subcollection.
// Created by old registration flow. No auth — bare userId query param.
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
			const data = doc.data();
			console.log("[courses] found doc:", doc.id, data);
			return { id: doc.id, ...data };
		});

		return NextResponse.json(courses, { status: 200 });
	} catch (error) {
		console.error("[courses] Error fetching courses:", error);
		return NextResponse.json({ message: "Error fetching courses" }, { status: 500 });
	}
}
