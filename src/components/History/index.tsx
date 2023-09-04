import { formatWithClientLocale } from "../../utils/timestamp";
import skull from "../../assets/skull.svg";
import win from "../../assets/win.svg";
import styles from "./History.module.css";

export function History({ data }: any) {
	const difficultyMap: any = {
		hard: 1,
		medium: 2,
		easy: 3,
	};

	const difficultyColors: any = {
		hard: "#6f1f1f",
		medium: "#c19a00",
		easy: "#5ec100",
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
						const difficultyComparison =
							difficultyMap[a.difficulty] -
							difficultyMap[b.difficulty];

						// If the difficulty levels are equal, compare the numbers
						if (difficultyComparison === 0) {
							return a.time.raw - b.time.raw;
						}

						return difficultyComparison;
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
											className={styles.appLogo}
											alt="Defeat"
										/>
									) : item.status === "Victory" ? (
										<img
											src={win}
											className={styles.appLogo}
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
