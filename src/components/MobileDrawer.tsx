"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import * as Dialog from "@radix-ui/react-dialog";
import { navItems, type NavItem } from "@/constants/navItems";
import styles from "./MobileDrawer.module.css";

function Arrow() {
	return (
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			className={styles.arrow}
		>
			<polyline points="6 9 12 15 18 9" />
		</svg>
	);
}

function CloseIcon() {
	return (
		<svg
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
		>
			<line x1="18" y1="6" x2="6" y2="18" />
			<line x1="6" y1="6" x2="18" y2="18" />
		</svg>
	);
}

function BurgerIcon() {
	return (
		<svg
			width="26"
			height="26"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="1.6"
		>
			<line x1="3" y1="7" x2="21" y2="7" />
			<line x1="3" y1="12" x2="21" y2="12" />
			<line x1="3" y1="17" x2="21" y2="17" />
		</svg>
	);
}

export default function MobileDrawer() {
	const pathname = usePathname();
	const isActive = (path?: string) => pathname === path;

	const renderChildren = (children: NavItem[], depth = 0) => {
		return (
			<ul className={styles.accordionList}>
				{children.map((child, index) => {
					const hasChildren = child.type === "menu" && child.children;
					const paddingLeft = `${16 + depth * 16}px`;

					if (!hasChildren) {
						return (
							<li key={index}>
								<Dialog.Close asChild>
									<Link
										href={child.path || "/"}
										className={`${styles.drawerLink} ${
											isActive(child.path) ? styles.active : ""
										}`}
										style={{ paddingLeft }}
									>
										{child.label}
									</Link>
								</Dialog.Close>
							</li>
						);
					}

					return (
						<li key={index}>
							<Collapsible.Root>
								<Collapsible.Trigger asChild>
									<button
										type="button"
										className={`${styles.accordionTrigger} ${
											isActive(child.path) ? styles.active : ""
										}`}
										style={{ paddingLeft }}
									>
										{child.label}
										<Arrow />
									</button>
								</Collapsible.Trigger>
								<Collapsible.Content className={styles.accordionContent}>
									{renderChildren(child.children!, depth + 1)}
								</Collapsible.Content>
							</Collapsible.Root>
						</li>
					);
				})}
			</ul>
		);
	};

	return (
		<div className={styles.drawerParent}>
			<Dialog.Root>
				<Dialog.Trigger asChild>
					<button
						className={styles.burger}
						aria-label="Open menu"
						type="button"
					>
						<BurgerIcon />
					</button>
				</Dialog.Trigger>
				<Dialog.Portal>
					<Dialog.Overlay className={styles.overlay} />
					<Dialog.Content className={styles.drawer}>
						<div className={styles.drawerHeader}>
							<Dialog.Title className={styles.drawerBrand}>
								ATHAYOG
							</Dialog.Title>
							<Dialog.Description className={styles.srOnly}>
								Site navigation menu
							</Dialog.Description>
							<Dialog.Close asChild>
								<button
									type="button"
									className={styles.closeBtn}
									aria-label="Close menu"
								>
									<CloseIcon />
								</button>
							</Dialog.Close>
						</div>

						<nav className={styles.drawerNav} aria-label="Mobile">
							<ul className={styles.drawerList}>
								{navItems.map((item, index) => {
									const hasChildren =
										item.type === "menu" && item.children;

									if (!hasChildren) {
										return (
											<li key={index}>
												<Dialog.Close asChild>
													<Link
														href={item.path || "/"}
														className={`${styles.drawerLink} ${
															isActive(item.path)
																? styles.active
																: ""
														}`}
													>
														{item.label}
													</Link>
												</Dialog.Close>
											</li>
										);
									}

									return (
										<li key={index}>
											<Collapsible.Root>
												<Collapsible.Trigger asChild>
													<button
														type="button"
														className={`${styles.accordionTrigger} ${
															isActive(item.path)
																? styles.active
																: ""
														}`}
													>
														{item.label}
														<Arrow />
													</button>
												</Collapsible.Trigger>
												<Collapsible.Content
													className={styles.accordionContent}
												>
													{renderChildren(item.children!, 1)}
												</Collapsible.Content>
											</Collapsible.Root>
										</li>
									);
								})}
							</ul>
						</nav>

						<div className={styles.drawerCtaGroup}>
							<Dialog.Close asChild>
								<Link href="/trial-classes" className="btn btn-cream">
									Get a <span>Free Trial</span>
								</Link>
							</Dialog.Close>
							<Dialog.Close asChild>
								<Link href="/login" className={styles.loginBtn}>
									Login
								</Link>
							</Dialog.Close>
						</div>
					</Dialog.Content>
				</Dialog.Portal>
			</Dialog.Root>
		</div>
	);
}
