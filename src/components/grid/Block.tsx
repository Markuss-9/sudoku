import { Square } from "./Square";
import styles from "./Square.module.css";
import { Grid, Paper } from "@mui/material";
import * as React from "react";

interface focus {
	x: number;
	y: number;
}

interface cellStruct {
	value: number;
	solved: number;
	x: number;
	y: number;
}

type matrix = cellStruct[][];

interface oggetto2 {
	block: matrix;
	click: Function;
	focusObj: focus;
	isTabletOrMobile: boolean;
}

export const Block = ({
	block,
	click,
	focusObj,
	isTabletOrMobile,
}: oggetto2) => {
	const cells: any = block.map((row: any) => {
		return row.map((element: any) => {
			return (
				// <Grid container>
				<Square
					value={element.value}
					click={click}
					y={element.y}
					x={element.x}
					focus={
						focusObj.x === element.x && focusObj.y === element.y
							? true
							: false
					}
					isError={
						element.value !== 0 && element.value !== element.solved
					}
					isTabletOrMobile={isTabletOrMobile}
				/>
				// </Grid>
			);
		});
	});

	const rows = [];
	for (let i = 0; i < 3; i++) {
		rows.push(
			<Grid container item key={i} spacing={1}>
				{cells.slice(i * 3, i * 3 + 3)}
			</Grid>
		);
	}
	return (
		<>
			<Grid
				container
				spacing={1}
				// className={isTabletOrMobile ? styles.blockMobile : styles.block}
			>
				{rows}
			</Grid>
		</>
	);
};
