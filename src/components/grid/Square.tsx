// import styled from "styled-components";
import styles from "./Square.module.css";
import { Grid, Paper, Box, Typography } from "@mui/material";

interface oggetto {
	value: number; //number non Number
	click: Function;
	x: number;
	y: number;
	focus: boolean;
	isError: boolean;
	isTabletOrMobile: boolean;
}

export const Square = ({
	value,
	click,
	x,
	y,
	focus,
	isError,
	isTabletOrMobile,
}: oggetto) => {
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
		: `${styles.valueZero}`;

	return (
		<>
			<Grid
				item
				style={{ flex: "1 0 0", padding: "4px" }}
				onClick={(e) => {
					click({ x: x, y: y });
				}}
			>
				<Paper
					elevation={3}
					style={{
						width: "100%",
						paddingTop: "100%",
						position: "relative",
					}}
				>
					<Typography
						variant="h6"
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
						}}
					>
						{value !== 0 ? value : `\u00A0`}
					</Typography>
				</Paper>
			</Grid>
			{/* <div
				className={`${backgrounds} - ${
					isTabletOrMobile ? styles.squareMobile : styles.squareClass
				}`}
				// className={classes.square}
				onClick={(e) => {
					click({ x: x, y: y });
				}}
			>
				{value !== 0 ? value : `\u00A0`}
			</div> */}
		</>
	);
};

// "&nbsp;"
