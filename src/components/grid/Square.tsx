import styles from "./Square.module.css";
import styled from "styled-components";

interface oggetto {
	value: number; //number non Number
	click: Function;
	x: number;
	y: number;
	focus: boolean;
	isError: boolean;
}

export const Square = ({ value, click, x, y, focus, isError }: oggetto) => {
	const colors: Array<string> = [
		"#59000a",
		"#520059",
		"#8f0000",
		"#003771",
		"#005912",
		"#918400",
		"#914100",
		"#818181",
		"#2b1f14",
	];

	const Cell = styled.div`
		background: ${isError
			? "#ff0000"
			: !focus && value !== 0
			? "#474747"
			: ""};
	`;

	return (
		<>
			<Cell
				className={`${styles.squareClass} ${
					focus && !isError ? styles.test1000 : ""
				}`}
				onClick={(e) => {
					click({ x: x, y: y });
				}}
			>
				{value !== 0 ? value : `\u00A0`}
			</Cell>
		</>
	);
};

// "&nbsp;"
