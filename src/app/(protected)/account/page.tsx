"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import useAuthStore from "@/store/useAuthStore";
import withAuth from "@/lib/withAuth";
import styles from "@/app/(protected)/account/Account.module.css";

interface Course {
	id: string;
	name: string;
	type: string;
	days: string;
	price: string;
	paymentStatus: string;
	createdAt: { _seconds: number };
}

function formatDate(seconds: number) {
	return new Date(seconds * 1000).toLocaleDateString("en-IN", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

function getInitials(name: string | null, email: string | null) {
	if (name) {
		return name
			.split(" ")
			.map((n) => n[0])
			.join("")
			.toUpperCase()
			.slice(0, 2);
	}
	if (email) {
		return email[0].toUpperCase();
	}
	return "U";
}

function AvatarImage({
	src,
	alt,
	initials,
}: {
	src: string;
	alt: string;
	initials: string;
}) {
	const [loaded, setLoaded] = useState(false);
	const [error, setError] = useState(false);

	if (error) return <div className={styles.avatarFallback}>{initials}</div>;

	return (
		<div className={styles.avatarWrap}>
			<span className={styles.avatarFallback}>{initials}</span>
			<Image
				src={src}
				alt={alt}
				fill
				sizes="100px"
				className={`${styles.avatar} ${loaded ? styles.avatarLoaded : ""}`}
				onLoad={() => setLoaded(true)}
				onError={() => setError(true)}
			/>
		</div>
	);
}

function AccountPage() {
	const { user, loading, handleLogout } = useAuthStore();
	const [courses, setCourses] = useState<Course[]>([]);
	const [coursesLoading, setCoursesLoading] = useState(true);
	const [coursesError, setCoursesError] = useState(false);
	const [payments, setPayments] = useState<any[]>([]); // eslint-disable-line @typescript-eslint/no-explicit-any
	const [paymentsLoading, setPaymentsLoading] = useState(true);

	useEffect(() => {
		if (!user) return;

		fetch(`/api/courses?userId=${user.uid}`)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch");
				return res.json();
			})
			.then((data) => {
				setCourses(data);
				setCoursesLoading(false);
			})
			.catch(() => {
				setCoursesError(true);
				setCoursesLoading(false);
			});

		fetch(`/api/payments`)
			.then((res) => {
				if (!res.ok) throw new Error("Failed to fetch");
				return res.json();
			})
			.then((data) => {
				setPayments(data.payments || []);
				setPaymentsLoading(false);
			})
			.catch(() => {
				setPaymentsLoading(false);
			});
	}, [user]);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				{/* Header */}
				<div className={styles.header}>
					{loading ? (
						<>
							<div className={styles.avatarSkeleton} />
							<div className={styles.headerInfo}>
								<div
									className={styles.headerTextSkeleton}
									style={{ width: 200 }}
								/>
								<div
									className={styles.headerTextSkeleton}
									style={{ width: 140, height: 14 }}
								/>
							</div>
						</>
					) : user ? (
						<>
							{user.photoURL ? (
								<AvatarImage
									src={user.photoURL}
									alt={user.displayName || "User"}
									initials={getInitials(user.displayName, user.email)}
								/>
							) : (
								<div className={styles.avatarFallback}>
									{getInitials(user.displayName, user.email)}
								</div>
							)}
							<div className={styles.headerInfo}>
								<h1 className={styles.headerName}>
									{user.displayName || "User"}
								</h1>
								{user.email && (
									<p className={styles.headerEmail}>{user.email}</p>
								)}
								{user.phoneNumber && (
									<p className={styles.headerPhone}>
										{user.phoneNumber}
									</p>
								)}
							</div>
						</>
					) : null}
				</div>

				{/* User Details */}
				{user && (
					<div className={styles.section}>
						<h2 className={styles.sectionTitle}>User Details</h2>
						<div className={styles.details}>
							<div className={styles.detailRow}>
								<span className={styles.detailLabel}>Name</span>
								<span className={styles.detailValue}>
									{user.displayName || "—"}
								</span>
							</div>
							<div className={styles.detailRow}>
								<span className={styles.detailLabel}>Email</span>
								<span className={styles.detailValue}>
									{user.email || "—"}
								</span>
							</div>
							{user.phoneNumber && (
								<div className={styles.detailRow}>
									<span className={styles.detailLabel}>Phone</span>
									<span className={styles.detailValue}>
										{user.phoneNumber}
									</span>
								</div>
							)}
						</div>
					</div>
				)}

				{/* Last Purchases */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Last Purchases</h2>
					<div className={styles.tableWrap}>
						<table className={styles.table}>
							<thead>
								<tr>
									<th>Name</th>
									<th>Type</th>
									<th>Days</th>
									<th>Price</th>
									<th>Payment Status</th>
									<th>Created At</th>
								</tr>
							</thead>
							<tbody>
								{coursesLoading ? (
									Array.from({ length: 3 }).map((_, i) => (
										<tr key={i} className={styles.skeletonRow}>
											{Array.from({ length: 6 }).map((_, j) => (
												<td key={j}>
													<div
														className={styles.skeletonCell}
														style={{
															width: `${50 + Math.random() * 40}%`,
														}}
													/>
												</td>
											))}
										</tr>
									))
								) : coursesError ? (
									<tr>
										<td colSpan={6} className={styles.emptyRow}>
											Failed to load purchases
										</td>
									</tr>
								) : courses.length === 0 ? (
									<tr>
										<td colSpan={6} className={styles.emptyRow}>
											No purchases yet
										</td>
									</tr>
								) : (
									courses.map((course) => (
										<tr key={course.id}>
											<td>{course.name || "—"}</td>
											<td>{course.type || "—"}</td>
											<td>{course.days || "—"}</td>
											<td>
												{course.price ? `₹${course.price}` : "—"}
											</td>
											<td>{course.paymentStatus || "—"}</td>
											<td>
												{course.createdAt?._seconds
													? formatDate(
															course.createdAt._seconds,
														)
													: "—"}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Payment History */}
				<div className={styles.section}>
					<h2 className={styles.sectionTitle}>Payment History</h2>
					<div className={styles.tableWrap}>
						<table className={styles.table}>
							<thead>
								<tr>
									<th>Plan</th>
									<th>Amount</th>
									<th>Status</th>
									<th>Date</th>
								</tr>
							</thead>
							<tbody>
								{paymentsLoading ? (
									Array.from({ length: 2 }).map((_, i) => (
										<tr key={i} className={styles.skeletonRow}>
											<td colSpan={4}>
												<div
													className={styles.skeletonCell}
													style={{ width: "60%" }}
												/>
											</td>
										</tr>
									))
								) : payments.length === 0 ? (
									<tr>
										<td colSpan={4} className={styles.emptyRow}>
											No payments yet
										</td>
									</tr>
								) : (
									payments.map((p, i) => (
										<tr key={p.razorpayOrderId || i}>
											<td>{p.planName || "—"}</td>
											<td>
												₹
												{(
													p.amount ||
													p.amountPaise / 100 ||
													0
												).toLocaleString("en-IN")}
											</td>
											<td>
												<span
													style={{
														color:
															p.status === "completed"
																? "var(--brand-deep)"
																: p.status === "pending"
																	? "var(--clay)"
																	: "inherit",
														fontWeight: 600,
													}}
												>
													{p.status === "completed"
														? "Completed"
														: p.status === "pending"
															? "Pending"
															: p.status || "—"}
												</span>
											</td>
											<td>
												{p.createdAt
													? new Date(
															p.createdAt,
														).toLocaleDateString("en-IN", {
															year: "numeric",
															month: "short",
															day: "numeric",
														})
													: "—"}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>

				{/* Actions */}
				<div className={styles.actions}>
					<button
						type="button"
						onClick={handleLogout}
						className="btn btn-ghost"
					>
						Log Out
					</button>
				</div>
			</div>
		</main>
	);
}

export default withAuth(AccountPage);
