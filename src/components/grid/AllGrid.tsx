import { Block } from "./Block";
import styles from "./Square.module.css";

import { createBlocks } from "../../utils/createBlocks";

import { useMediaQuery } from "react-responsive";

import { Grid, Paper, Container, Stack } from "@mui/material";

interface coords {
	x: number;
	y: number;
}

interface merge {
	puzzle: number;
	solved: number;
}

interface Grid {
	grid: merge[][];
	click: Function;
	focusObj: coords;
}

export const AllGrid = ({ grid, click, focusObj }: Grid) => {
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 700px)" }); // 1224px
	const blocksMapped = createBlocks(grid).map((row: any) => {
		return (
			<div>
				{row.map((item: any) => {
					return (
						<Block
							block={item}
							click={click}
							focusObj={focusObj}
							isTabletOrMobile={isTabletOrMobile}
						/>
					);
				})}
			</div>
		);
	});

	return (
		<>
			<div className={styles.testResponsive}>{blocksMapped}</div>
		</>
	);
};
