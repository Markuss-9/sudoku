import { Block } from "./Block";
import styles from "./Square.module.css";

import { createBlocks } from "../../utils/createBlocks";

interface coords {
	x: number;
	y: number;
}

interface cell extends coords {
	value: number;
}

interface Grid {
	grid: number[][];
	blocks: cell[][][][];
	click: Function;
	focusObj: coords;
}

export const AllGrid = ({ grid, blocks, click, focusObj }: Grid) => {
	const blocksMapped = createBlocks(grid).map((row: any) => {
		return (
			<div className={styles.blocchetto}>
				{row.map((item: any) => {
					// console.log(item);

					return (
						<Block block={item} click={click} focusObj={focusObj} />
					);
				})}
			</div>
		);
	});
	return (
		<>
			<div className={styles.tabellona}>{blocksMapped}</div>
		</>
	);
};
