"use client";

import useAuthStore from "@/store/useAuthStore";
import withAuth from "@/lib/withAuth";

function AccountPage() {
	const { user, handleLogout } = useAuthStore();

	return (
		<main style={{ padding: "40px 24px 80px", maxWidth: 600, margin: "0 auto" }}>
			<h1 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginBottom: 24 }}>
				My Account
			</h1>

			{user && (
				<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
					{user.photoURL && (
						<img
							src={user.photoURL}
							alt={user.displayName || "User"}
							width={64}
							height={64}
							style={{ borderRadius: "50%" }}
						/>
					)}
					<div>
						<p style={{ fontWeight: 600 }}>{user.displayName || "User"}</p>
						<p style={{ opacity: 0.7 }}>{user.email || user.phoneNumber}</p>
					</div>
					<button
						type="button"
						onClick={handleLogout}
						className="btn btn-ghost"
						style={{ marginTop: 16, alignSelf: "flex-start" }}
					>
						Log Out
					</button>
				</div>
			)}
		</main>
	);
}

export default withAuth(AccountPage);
