"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "@/lib/firebase";
import useAuthStore from "@/store/useAuthStore";
import { useGoogleOneTap } from "@/hooks/useGoogleOneTap";
import styles from "./Login.module.css";

function GoogleIcon() {
	return (
		<svg width="20" height="20" viewBox="0 0 48 48">
			<path
				fill="#FFC107"
				d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
			/>
			<path
				fill="#FF3D00"
				d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
			/>
			<path
				fill="#4CAF50"
				d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
			/>
			<path
				fill="#1976D2"
				d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
			/>
		</svg>
	);
}

function LoginContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const redirectPath = searchParams.get("redirect") || "/";

	const {
		user,
		loading,
		error,
		handleSignIn,
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

	const { isLoaded: gisLoaded } = useGoogleOneTap({
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

	const handleGooglePopup = async () => {
		try {
			await handleSignIn();
			router.push(redirectPath);
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

						{gisLoaded ? (
							<div
								ref={googleButtonRef}
								className={styles.googleButtonWrapper}
							/>
						) : (
							<button
								type="button"
								onClick={handleGooglePopup}
								disabled={loading}
								className={styles.googleBtn}
							>
								<GoogleIcon />
								{loading ? "Signing in..." : "Continue with Google"}
							</button>
						)}

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
								onClick={handleGooglePopup}
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
