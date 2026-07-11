"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

export default function withAuth<P extends object>(
	WrappedComponent: React.ComponentType<P>,
) {
	function AuthWrapper(props: P) {
		const { isAuthenticated, loading } = useAuthStore();
		const router = useRouter();

		useEffect(() => {
			if (!loading && !isAuthenticated) {
				router.push("/login");
			}
		}, [isAuthenticated, loading, router]);

		if (loading) {
			return (
				<div style={{ padding: "200px 20px", textAlign: "center" }}>
					Loading...
				</div>
			);
		}

		if (!isAuthenticated) return null;

		return <WrappedComponent {...props} />;
	}

	return AuthWrapper;
}
