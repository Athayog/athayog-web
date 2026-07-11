"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
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
		<html lang="en">
			<head>
				<style>{`
          :root {
            --brand: #718958;
            --brand-deep: #566b3f;
            --cream: #f5f3ea;
            --ink: #2b2e24;
            --line: rgba(43,46,36,0.14);
            --font-label: Cinzel, serif;
            --font-display: "Cormorant Garamond", Georgia, serif;
            --font-body: Inter, system-ui, -apple-system, sans-serif;
          }
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            background: var(--cream);
            color: var(--ink);
            font-family: var(--font-body);
            -webkit-font-smoothing: antialiased;
          }
          .eyebrow {
            font-family: var(--font-label);
            text-transform: uppercase;
            letter-spacing: 0.22em;
            font-size: 0.72rem;
            color: var(--brand-deep);
            font-weight: 500;
          }
          h2 {
            font-family: var(--font-display);
            font-size: clamp(2rem, 4.2vw, 2.9rem);
            font-weight: 600;
            line-height: 1.12;
            margin-top: 6px;
            color: var(--ink);
          }
          .lead {
            font-family: var(--font-display);
            font-size: 1.3rem;
            color: var(--brand-deep);
            font-weight: 400;
            line-height: 1.4;
          }
          .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-body);
            font-weight: 500;
            font-size: 0.95rem;
            padding: 14px 26px;
            border-radius: 2px;
            border: 1px solid var(--brand-deep);
            cursor: pointer;
            text-decoration: none;
            transition: background 0.25s, color 0.25s, border-color 0.25s;
          }
          .btn-primary {
            background: var(--brand-deep);
            color: var(--cream);
          }
          .btn-primary:hover {
            background: #3a472c;
            border-color: #3a472c;
          }
          .btn-ghost {
            background: transparent;
            color: var(--brand-deep);
          }
          .btn-ghost:hover {
            background: var(--brand-deep);
            color: var(--cream);
          }
        `}</style>
			</head>
			<body>
				<section
					style={{
						minHeight: "100vh",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "24px",
					}}
				>
					<div
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
						<p
							className="lead"
							style={{ marginTop: 12 }}
						>
							We encountered an unexpected error.
							Please try again.
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
							<button
								type="button"
								onClick={reset}
								className="btn btn-primary"
							>
								Try Again
							</button>
							<Link
								href="/"
								className="btn btn-ghost"
							>
								Go Home
							</Link>
						</div>
					</div>
				</section>
			</body>
		</html>
	);
}
