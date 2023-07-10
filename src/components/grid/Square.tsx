// import { useState } from "react";
import styles from "./Square.module.css";

interface oggetto {
	value?: number; //number non Number
	click: Function;
	x: number;
	y: number;
	focus: boolean;
}

export const Square = ({ value, click, x, y, focus }: oggetto) => {
	// const [isFocus, setFocus] = useState(false);

	return (
		<>
			<div
				className={`${styles.square} ${focus ? styles.test1000 : ""}`}
				onClick={(e) => {
					// console.log(`yoo`);
					// isFocus ? setFocus(false) : setFocus(true);
					click({ x: x, y: y });
					// e.target.classList.add('bg-yellow');
				}}
			>
				{/* {value || value !== 0 ? value : "\u00A0"} */}
				{value}
			</div>
		</>
	);
};

// "&nbsp;"
