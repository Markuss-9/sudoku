import styles from "./WinnerModal.module.css";
import { useNavigate } from "react-router-dom";
export const WinnerModal = ({ handleClose, show, title }: any) => {
	const navigate = useNavigate();
	const showHideClassName = show
		? `${styles.modal} ${styles.displayBlock}`
		: `${styles.modal} ${styles.displayNone}`;

	return (
		<div className={showHideClassName}>
			<section className={styles.modalMain}>
				<h1 className={styles.title}>{title}</h1>
				<button
					type="button"
					className={styles.buttonCool}
					onClick={() => {
						handleClose(false);
					}}
				>
					Close
				</button>
				<button
					type="button"
					className={styles.buttonCool}
					onClick={() => {
						navigate("/");
					}}
				>
					Home
				</button>
			</section>
		</div>
	);
};
