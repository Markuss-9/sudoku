import { formatWithClientLocale } from "../../utils/timestamp";
import skull from "../../assets/skull.svg";
import win from "../../assets/win.svg";
import comment from "../../assets/comment.svg";
import styles from "./History.module.css";

export function History({ data, updateHistoryWithComment }: any) {
	const difficultyMap: any = {
		hard: 1,
		medium: 2,
		easy: 3,
	};
	const statusMap: any = {
		Victory: 1,
		Defeat: 2,
	};

	return (
		<>
			<table className={styles.listContainer}>
				{/* <tr className={styles.listItem}>
					<th className={`${styles.itemBox} ${styles.icon}`}></th>
					<th
						className={`${styles.itemBox} ${styles.difficulty} ${styles.header}`}
					>
						Difficulty
					</th>
					<th
						className={`${styles.itemBox} ${styles.time} ${styles.header}`}
					>
						Time
					</th>
					<th
						className={`${styles.itemBox} ${styles.timestamp} ${styles.header}`}
					>
						Date
					</th>
				</tr> */}
				{data
					.sort((a: any, b: any) => {
						const statusComparison =
							statusMap[a.status] - statusMap[b.status];

						const difficultyComparison =
							difficultyMap[a.difficulty] -
							difficultyMap[b.difficulty];

						// If the difficulty levels are equal, compare the numbers
						if (statusComparison) return statusComparison;
						if (difficultyComparison) return difficultyComparison;

						if (
							statusComparison === 0 &&
							difficultyComparison === 0 &&
							a.time &&
							b.time
						) {
							return a.time.raw - b.time.raw;
						}
					})
					.map((item: any) => {
						return (
							<tr className={styles.listItem}>
								<td
									className={`${styles.itemBox} ${styles.icon}`}
								>
									{item.status === "Defeat" ? (
										<img
											src={skull}
											className={styles.statusIcon}
											alt="Defeat"
										/>
									) : item.status === "Victory" ? (
										<img
											src={win}
											className={styles.statusIcon}
											alt="Victory"
										/>
									) : (
										""
									)}
								</td>
								<td
									className={`${styles.itemBox} ${
										styles.difficulty
									} ${styles[item.difficulty]}`}
								>
									{item.difficulty}
								</td>
								<td
									className={`${styles.itemBox} ${styles.time}`}
								>
									{item.time &&
										`${item.time.minutes
											.toString()
											.padStart(
												2,
												"0"
											)}:${item.time.seconds
											.toString()
											.padStart(2, "0")}`}
								</td>
								<td
									className={`${styles.itemBox} ${styles.comment}`}
								>
									{item.comment ? (
										<span
											onClick={() => {
												const comment =
													prompt("Enter a comment");
												updateHistoryWithComment(
													item.timestamp,
													comment
												);
											}}
										>
											{item.comment}
										</span>
									) : (
										<img
											src={comment}
											className={styles.commentIcon}
											alt="Comment"
											onClick={() => {
												const comment =
													prompt("Enter a comment");
												updateHistoryWithComment(
													item.timestamp,
													comment
												);
											}}
										/>
									)}
								</td>
								<td
									className={`${styles.itemBox} ${styles.timestamp}`}
								>
									{formatWithClientLocale(item.timestamp)}
								</td>
							</tr>
						);
					})}
			</table>
		</>
	);
}
