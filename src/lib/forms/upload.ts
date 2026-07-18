"use client";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function uploadFormFile(file: File): Promise<string> {
	const timestamp = Date.now();
	const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
	const path = `uploads/${timestamp}_${safeName}`;
	const fileRef = ref(storage, path);
	const snapshot = await uploadBytes(fileRef, file);
	return getDownloadURL(snapshot.ref);
}
