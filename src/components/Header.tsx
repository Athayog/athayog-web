"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { navItems, type NavItem } from "@/constants/navItems";
import useAuthStore from "@/store/useAuthStore";
import AccountMenu from "./AccountMenu";
import MobileDrawer from "./MobileDrawer";
import styles from "./Header.module.css";

function ChevronDown() {
	return (
		<svg
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			className={styles.chevron}
		>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	);
}

function ChevronRight() {
	return (
		<svg
			width="14"
			height="14"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<polyline points="9 18 15 12 9 6" />
		</svg>
	);
}

function renderDropdownItems(children: NavItem[], isActive: (path?: string) => boolean) {
	return children.map((child, index) => {
		const hasChildren = child.type === "menu" && child.children;

		if (!hasChildren) {
			return (
				<DropdownMenu.Item key={index} asChild>
					<Link
						href={child.path || "/"}
						className={`${styles.dropdownLink} ${
							isActive(child.path) ? styles.active : ""
						}`}
					>
						{child.label}
					</Link>
				</DropdownMenu.Item>
			);
		}

		return (
			<DropdownMenu.Sub key={index}>
				<DropdownMenu.SubTrigger
					className={`${styles.subTrigger} ${
						isActive(child.path) ? styles.active : ""
					}`}
				>
					{child.label}
					<ChevronRight />
				</DropdownMenu.SubTrigger>
				<DropdownMenu.Portal>
					<DropdownMenu.SubContent
						className={styles.subContent}
						sideOffset={2}
						alignOffset={-4}
					>
						{child.children!.map((grandChild, grandChildIndex) => (
							<DropdownMenu.Item key={grandChildIndex} asChild>
								<Link
									href={grandChild.path || "/"}
									className={`${styles.dropdownLink} ${
										isActive(grandChild.path) ? styles.active : ""
									}`}
								>
									{grandChild.label}
								</Link>
							</DropdownMenu.Item>
						))}
					</DropdownMenu.SubContent>
				</DropdownMenu.Portal>
			</DropdownMenu.Sub>
		);
	});
}

export default function Header() {
	const pathname = usePathname();
	const isActive = (path?: string) => pathname === path;
	const { isAuthenticated, userSnapshot } = useAuthStore();
	const isLoggedIn = isAuthenticated || userSnapshot !== null;

	return (
		<header className={styles.header}>
			<div className={`wrap ${styles.nav}`}>
				<Link href="/" className={styles.brand}>
					<Image
						src="/Logo.png"
						alt="Athayog Living"
						width={140}
						height={36}
						priority
					/>
				</Link>

				<nav className={styles.navLinks} aria-label="Primary">
					{navItems.map((item, index) => {
						if (item.type === "nav" || !item.children) {
							return (
								<Link
									key={index}
									href={item.path || "/"}
									className={`${styles.navLink} ${
										isActive(item.path) ? styles.active : ""
									}`}
								>
									{item.label}
								</Link>
							);
						}

						return (
							<DropdownMenu.Root key={index}>
								<DropdownMenu.Trigger asChild>
									<button
										type="button"
										className={`${styles.dropdownTrigger} ${
											isActive(item.path) ? styles.active : ""
										}`}
									>
										{item.label}
										<ChevronDown />
									</button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Portal>
									<DropdownMenu.Content
										className={styles.dropdownContent}
										sideOffset={12}
										align="start"
										alignOffset={-4}
									>
										{renderDropdownItems(item.children, isActive)}
									</DropdownMenu.Content>
								</DropdownMenu.Portal>
							</DropdownMenu.Root>
						);
					})}
				</nav>

				<div className={styles.ctaGroup}>
					<Link href="/trial-classes" className="btn btn-primary nav-cta">
						Free Trial
					</Link>
					{isLoggedIn ? (
						<AccountMenu />
					) : (
						<Link href="/login" className={styles.loginBtn}>
							Login
						</Link>
					)}
				</div>

				<MobileDrawer />
			</div>
		</header>
	);
}
