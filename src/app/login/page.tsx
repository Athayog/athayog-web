"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAuthStore from "@/store/useAuthStore";
import { useGoogleOneTap } from "@/hooks/useGoogleOneTap";
import styles from "./Login.module.css";

function LoginContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectPath = searchParams.get("redirect") || "/";

	const {
		user,
		loading,
		error,
		handleSendOtp,
		handleSignInWithOtp,
		clearError,
	} = useAuthStore();

	const [phone, setPhone] = useState("");
	const [otp, setOtp] = useState(["", "", "", "", "", ""]);
	const [otpSent, setOtpSent] = useState(false);
	const [otpLoading, setOtpLoading] = useState(false);
	const [googleLoading, setGoogleLoading] = useState(false);
	const [googleError, setGoogleError] = useState<string | null>(null);
	const recaptchaRef = useRef<RecaptchaVerifier | null>(null);
	const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);
	const googleButtonRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (user) {
			router.push(redirectPath);
		}
	}, [user, router, redirectPath]);

	const handleGoogleSuccess = useCallback(() => {
		router.push(redirectPath);
	}, [router, redirectPath]);

	const handleGoogleError = useCallback((errorMsg: string) => {
		setGoogleError(errorMsg);
	}, []);

	const handleGoogleLoading = useCallback((isLoading: boolean) => {
		setGoogleLoading(isLoading);
	}, []);

	useGoogleOneTap({
		onSuccess: handleGoogleSuccess,
		onError: handleGoogleError,
		onLoading: handleGoogleLoading,
		disabled: !!user,
		buttonRef: googleButtonRef,
	});

	const setupRecaptcha = () => {
		if (recaptchaRef.current) return;
		recaptchaRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
			size: "invisible",
		});
	};

	const handleSendOtpClick = async () => {
		setupRecaptcha();
		setOtpLoading(true);
		try {
			const formatted = phone.startsWith("+91") ? phone : "+91" + phone;
			await handleSendOtp(formatted, recaptchaRef.current!);
			setOtpSent(true);
		} catch {
			// Error handled by store
		} finally {
			setOtpLoading(false);
		}
	};

	const handleVerifyOtp = async () => {
		try {
			await handleSignInWithOtp(otp.join(""));
		} catch {
			// Error handled by store
		}
	};

	const handleOtpChange = (value: string, index: number) => {
		if (value.length > 1) return;
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		if (value && index < 5) {
			otpInputRefs.current[index + 1]?.focus();
		}
	};

	const handleOtpKeyDown = (e: React.KeyboardEvent, index: number) => {
		if (e.key === "Backspace" && !otp[index] && index > 0) {
			otpInputRefs.current[index - 1]?.focus();
		}
	};

	const activeError = googleError || error;
	const activeLoading = googleLoading || loading;

	return (
		<main className={styles.main}>
			<div className={styles.card}>
				{otpSent ? (
					<div className={styles.otpSection}>
						<h1 className={styles.title}>OTP Verification</h1>
						<p className={styles.subtitle}>
							Enter the code we sent to <strong>{phone}</strong>
						</p>

						<div className={styles.otpInputs}>
							{otp.map((digit, i) => (
								<input
									key={i}
									ref={(el) => {
										otpInputRefs.current[i] = el;
									}}
									type="text"
									inputMode="numeric"
									maxLength={1}
									value={digit}
									onChange={(e) => handleOtpChange(e.target.value, i)}
									onKeyDown={(e) => handleOtpKeyDown(e, i)}
									className={styles.otpInput}
									autoFocus={i === 0}
								/>
							))}
						</div>

						<button
							type="button"
							onClick={handleVerifyOtp}
							disabled={activeLoading || otp.some((d) => !d)}
							className={`btn btn-primary ${styles.submitBtn}`}
						>
							{activeLoading ? "Verifying..." : "Verify OTP"}
						</button>

						<p className={styles.resend}>
							Didn&apos;t receive the code?{" "}
							<button
								type="button"
								onClick={handleSendOtpClick}
								className={styles.resendBtn}
							>
								Resend
							</button>
						</p>
					</div>
				) : (
					<>
						<h1 className={styles.title}>Welcome Back to Wellness</h1>
						<p className={styles.subtitle}>
							Sign in to access your account and classes.
						</p>

						<div
							ref={googleButtonRef}
							className={styles.googleButtonWrapper}
						/>

						<div className={styles.divider}>
							<span>or</span>
						</div>

						<div className={styles.phoneSection}>
							<label htmlFor="phone" className={styles.phoneLabel}>
								Sign in with phone
							</label>
							<input
								id="phone"
								type="tel"
								placeholder="+91 98765 43210"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								className={styles.phoneInput}
							/>
							<button
								type="button"
								onClick={handleSendOtpClick}
								disabled={otpLoading || !phone}
								className={`btn btn-primary ${styles.submitBtn}`}
							>
								{otpLoading ? "Sending OTP..." : "Get OTP"}
							</button>
						</div>

						<p className={styles.signup}>
							Don&apos;t have an account?{" "}
							<button
								type="button"
								onClick={() => {
									if (googleButtonRef.current) {
										const btn = googleButtonRef.current.querySelector(
											"div[role=button]",
										) as HTMLElement | null;
										btn?.click();
									}
								}}
								className={styles.signupBtn}
							>
								Sign up with Google
							</button>
						</p>
					</>
				)}

				{activeError && (
					<div className={styles.error}>
						{activeError}
						<button
							type="button"
							onClick={() => {
								clearError();
								setGoogleError(null);
							}}
							className={styles.errorClose}
						>
							×
						</button>
					</div>
				)}

				<div id="recaptcha-container" />
			</div>
		</main>
	);
}

export default function LoginPage() {
	return (
		<Suspense
			fallback={
				<main className={styles.main}>
					<div className={styles.card}>Loading...</div>
				</main>
			}
		>
			<LoginContent />
		</Suspense>
	);
}
