import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Athayog Living — Yoga & Wellness in Indiranagar, Bengaluru";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				background: "#3A472C",
				fontFamily: "Georgia, serif",
				color: "#F5F3EA",
				padding: 60,
			}}
		>
			{/* Mandala decorative circles */}
			<div
				style={{
					position: "absolute",
					right: -120,
					top: "50%",
					transform: "translateY(-50%)",
					width: 500,
					height: 500,
					borderRadius: "50%",
					border: "2px solid rgba(174,194,142,0.3)",
					opacity: 0.4,
				}}
			/>
			<div
				style={{
					position: "absolute",
					right: -60,
					top: "50%",
					transform: "translateY(-50%)",
					width: 380,
					height: 380,
					borderRadius: "50%",
					border: "1px solid rgba(174,194,142,0.25)",
					opacity: 0.3,
				}}
			/>

			{/* Brand */}
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: 20,
					position: "relative",
					zIndex: 1,
				}}
			>
				<div
					style={{
						fontSize: 72,
						fontWeight: 700,
						letterSpacing: "0.08em",
						color: "#F5F3EA",
						fontFamily: "Georgia, serif",
					}}
				>
					ATHAYOG LIVING
				</div>

				<div
					style={{
						fontSize: 28,
						fontStyle: "italic",
						color: "#AEC28E",
						fontFamily: "Georgia, serif",
						marginTop: -8,
					}}
				>
					A Sanctum For The Spirit
				</div>

				{/* Divider */}
				<div
					style={{
						width: 320,
						height: 2,
						background: "#718958",
						marginTop: 16,
					}}
				/>

				<div
					style={{
						fontSize: 24,
						color: "#DCE2CE",
						fontFamily: "system-ui, sans-serif",
						marginTop: 8,
					}}
				>
					Yoga &amp; Wellness · Indiranagar, Bengaluru
				</div>

				<div
					style={{
						fontSize: 18,
						color: "#9DA68C",
						fontFamily: "system-ui, sans-serif",
					}}
				>
					athayogliving.com
				</div>
			</div>
		</div>,
		{ ...size },
	);
}
