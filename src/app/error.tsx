"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<section
			style={{
				minHeight: "60vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "84px 0",
			}}
		>
			<div
				className="wrap"
				style={{
					textAlign: "center",
					maxWidth: 600,
					margin: "0 auto",
				}}
			>
				<div
					style={{
						width: 64,
						height: 64,
						borderRadius: "50%",
						border: "2px solid var(--line)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						margin: "0 auto 22px",
					}}
				>
					<span
						style={{
							fontSize: "1.6rem",
							color: "var(--brand)",
							fontWeight: 600,
						}}
					>
						!
					</span>
				</div>
				<span className="eyebrow">Error</span>
				<h2>Something Went Wrong</h2>
				<p className="lead" style={{ marginTop: 12, opacity: 0.85 }}>
					We encountered an unexpected error. Please try again.
				</p>
				<div
					style={{
						display: "flex",
						gap: 14,
						justifyContent: "center",
						marginTop: 32,
						flexWrap: "wrap",
					}}
				>
					<button type="button" onClick={reset} className="btn btn-primary">
						Try Again
					</button>
					<Link href="/" className="btn btn-ghost">
						Go Home
					</Link>
				</div>
			</div>
		</section>
	);
}
