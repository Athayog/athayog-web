import styles from "@/app/(protected)/account/Account.module.css";

export default function AccountSkeleton() {
	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.header}>
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
				</div>

				<div className={styles.section}>
					<div
						className={styles.headerTextSkeleton}
						style={{ width: 120, height: 16, marginBottom: 16 }}
					/>
					<div className={styles.tableWrap}>
						<table className={styles.table}>
							<thead>
								<tr>
									{Array.from({ length: 4 }).map((_, i) => (
										<th key={i}>
											<div
												className={styles.skeletonCell}
												style={{
													width: `${60 + i * 8}%`,
												}}
											/>
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{Array.from({ length: 2 }).map((_, i) => (
									<tr key={i} className={styles.skeletonRow}>
										{Array.from({ length: 4 }).map((_, j) => (
											<td key={j}>
												<div
													className={styles.skeletonCell}
													style={{
														width: `${50 + (i + j) * 6}%`,
													}}
												/>
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</main>
	);
}
