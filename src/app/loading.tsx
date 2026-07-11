export default function Loading() {
	return (
		<section
			style={{
				minHeight: "40vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				padding: "80px 24px",
			}}
		>
			<div
				style={{
					width: 32,
					height: 32,
					borderRadius: "50%",
					border: "3px solid var(--line-soft)",
					borderTopColor: "var(--brand)",
					animation: "spin 0.6s linear infinite",
				}}
			/>
			<style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
		</section>
	);
}
