// import styled from "styled-components";
import styles from "./Square.module.css";

interface oggetto {
	value: number; //number non Number
	click: Function;
	x: number;
	y: number;
	focus: boolean;
	isError: boolean;
}

export const Square = ({ value, click, x, y, focus, isError }: oggetto) => {
	// const colors: Array<string> = [
	// 	"#59000a",
	// 	"#520059",
	// 	"#8f0000",
	// 	"#003771",
	// 	"#005912",
	// 	"#918400",
	// 	"#914100",
	// 	"#818181",
	// 	"#2b1f14",
	// ];

	// const Cell = styled.div`
	// 	height: 30px;
	// 	width: 30px;
	// 	padding: 10px;
	// 	display: inline-flex;
	// 	border-radius: 10px;
	// 	text-align: center;
	// 	justify-content: center;
	// 	align-items: center;
	// 	border: 2px solid rgb(0, 0, 0);

	// 	background: ${isError
	// 		? "#ff0000"
	// 		: focus
	// 		? "#0098ff"
	// 		: value !== 0
	// 		? "#474747"
	// 		: "#666666"};
	// `;

	// styles.squareClass
	const backgrounds = isError
		? `${styles.error}`
		: focus
		? `${styles.focus}`
		: value !== 0
		? `${styles.valueNotZero}`
		: "";

	return (
		<>
			<div
				className={`${styles.squareClass} ${backgrounds}`}
				onClick={(e) => {
					click({ x: x, y: y });
				}}
			>
				{value !== 0 ? value : `\u00A0`}
			</div>
		</>
	);
};

// "&nbsp;"
