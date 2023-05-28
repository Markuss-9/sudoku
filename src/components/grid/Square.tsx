import styles from "./Square.module.css";

export const Square = ({ value }: any) => {
	return (
		<>
			<div className={styles.square}>{value ? value : "\u00A0"}</div>
		</>
	);
};

// "&nbsp;"
