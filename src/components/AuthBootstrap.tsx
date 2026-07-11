"use client";

import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

export default function AuthBootstrap() {
	const initializeAuth = useAuthStore((s) => s.initializeAuth);

	useEffect(() => {
		const unsubscribe = initializeAuth();
		return unsubscribe;
	}, [initializeAuth]);

	return null;
}
