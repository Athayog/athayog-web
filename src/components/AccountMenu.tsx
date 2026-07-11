"use client";

import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useAuthStore from "@/store/useAuthStore";
import styles from "./AccountMenu.module.css";

function getInitials(name: string | null, email: string | null) {
	if (name) {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	}
	if (email) return email[0].toUpperCase();
	return "U";
}

export default function AccountMenu() {
	const { user, loading, handleLogout } = useAuthStore();

	if (loading || !user) return null;

	const initials = getInitials(user.displayName, user.email);

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button
					type="button"
					className={styles.trigger}
					aria-label="Account menu"
				>
					{user.photoURL ? (
						<img
							src={user.photoURL}
							alt={user.displayName || "User"}
							className={styles.avatar}
						/>
					) : (
						<span className={styles.fallback}>{initials}</span>
					)}
				</button>
			</DropdownMenu.Trigger>

			<DropdownMenu.Portal>
				<DropdownMenu.Content
					className={styles.content}
					sideOffset={12}
					align="end"
				>
					<div className={styles.userInfo}>
						<p className={styles.userName}>
							{user.displayName || "User"}
						</p>
						{user.email && (
							<p className={styles.userEmail}>{user.email}</p>
						)}
					</div>

					<DropdownMenu.Item asChild>
						<Link href="/account" className={styles.menuItem}>
							My Account
						</Link>
					</DropdownMenu.Item>

					<DropdownMenu.Item asChild>
						<button
							type="button"
							onClick={handleLogout}
							className={styles.menuItem}
						>
							Log Out
						</button>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
