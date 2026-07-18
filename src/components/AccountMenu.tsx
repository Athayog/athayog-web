"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import useAuthStore from "@/store/useAuthStore";
import styles from "@/components/AccountMenu.module.css";

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

function AvatarImage({ src, alt }: { src: string; alt: string }) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	if (error) return null;

	return (
		<Image
			src={src}
			alt={alt}
			fill
			sizes="36px"
			className={`${styles.avatar} ${loaded ? styles.avatarLoaded : ""}`}
			onLoad={() => setLoaded(true)}
			onError={() => setError(true)}
		/>
	);
}

export default function AccountMenu() {
	const { user, userSnapshot, loading, handleLogout } = useAuthStore();
	const displayUser = user || userSnapshot;

	if (loading || !displayUser) return null;

	const initials = getInitials(displayUser.displayName, displayUser.email);

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild>
				<button
					type="button"
					className={styles.trigger}
					aria-label="Account menu"
				>
					<div className={styles.avatarWrap}>
						<span className={styles.fallback}>{initials}</span>
						{displayUser.photoURL && (
							<AvatarImage
								src={displayUser.photoURL}
								alt={displayUser.displayName || "User"}
							/>
						)}
					</div>
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
							{displayUser.displayName || "User"}
						</p>
						{displayUser.email && (
							<p className={styles.userEmail}>{displayUser.email}</p>
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
