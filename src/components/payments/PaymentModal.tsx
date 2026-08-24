"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

declare global {
	interface Window {
		Razorpay: new (options: RazorpayOptions) => { open: () => void };
	}
}

interface RazorpayOptions {
	key: string;
	amount: number;
	currency: string;
	name: string;
	description: string;
	order_id: string;
	handler: (response: {
		razorpay_payment_id: string;
		razorpay_order_id: string;
		razorpay_signature: string;
	}) => void;
	prefill: {
		name: string;
		email: string;
		contact: string;
	};
	theme: { color: string };
	modal: {
		ondismiss: () => void;
	};
}

type PaymentModalProps = {
	planId: string;
	planName: string;
	subtotal: number;
	total: number;
	children: React.ReactNode;
	className?: string;
};

export default function PaymentModal({
	planId,
	planName,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	subtotal,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	total,
	children,
	className,
}: PaymentModalProps) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const { isAuthenticated, setRedirectPath, userSnapshot } = useAuthStore();

	const handleClick = useCallback(async () => {
		setError(null);

		// 1. Auth gate
		if (!isAuthenticated) {
			setRedirectPath(window.location.pathname + "#pricing");
			router.push("/login");
			return;
		}

		setLoading(true);

		try {
			// 2. Create order on server
			const orderRes = await fetch("/api/payments/create-order", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ planId }),
			});

			if (!orderRes.ok) {
				const errBody = await orderRes.json().catch(() => ({}));
				throw new Error(errBody.error || "Failed to create order");
			}

			const { razorpayOrderId, amount, currency, keyId } = await orderRes.json();

			// 3. Load Razorpay script dynamically
			if (!window.Razorpay) {
				await new Promise<void>((resolve, reject) => {
					const script = document.createElement("script");
					script.src = "https://checkout.razorpay.com/v1/checkout.js";
					script.onload = () => resolve();
					script.onerror = () => reject(new Error("Failed to load Razorpay"));
					document.body.appendChild(script);
				});
			}

			// 4. Open Razorpay popup
			const rzp = new window.Razorpay({
				key: keyId,
				amount,
				currency,
				name: "Athayog Living",
				description: planName,
				order_id: razorpayOrderId,
				prefill: {
					name: userSnapshot?.displayName || "",
					email: userSnapshot?.email || "",
					contact: userSnapshot?.phoneNumber || "",
				},
				theme: { color: "#566B3F" },
				modal: {
					ondismiss: () => {
						setLoading(false);
					},
				},
				handler: async (response) => {
					// 5. Verify payment server-side
					const verifyRes = await fetch("/api/payments/verify", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify(response),
					});

					if (!verifyRes.ok) {
						setError("Payment verification failed. Please contact support.");
						setLoading(false);
						return;
					}

					// 6. Success — redirect
					router.push(`/payment-success?plan=${planId}`);
				},
			});

			rzp.open();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Something went wrong");
			setLoading(false);
		}
	}, [planId, planName, isAuthenticated, setRedirectPath, router]);

	return (
		<>
			<button
				type="button"
				className={className || "btn btn-light"}
				onClick={handleClick}
				disabled={loading}
			>
				{loading ? "Processing…" : children}
			</button>
			{error && (
				<p style={{ fontSize: "0.8rem", color: "#e7ecdd", marginTop: 6 }}>
					{error}
				</p>
			)}
		</>
	);
}
