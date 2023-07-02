import styles from "./ButtonsActions.module.css";

interface properties {
	update: Function;
}

export const ButtonsActions = ({ update }: properties) => {
	// const numbers = [];
	// for (let i = 1; i <= 9; i++) {
	// 	numbers.push(i);
	// }
	const numbers = Array.from({ length: 9 }, (_, i) => i + 1);
	return (
		<>
			{numbers.map((item) => {
				return (
					<div
						className={styles.buttonNumber}
						onClick={() => {
							update(item);
							// console.log(item);
						}}
					>
						{item}
					</div>
				);
			})}
		</>
	);
};
