import { useState } from "react";
import { Block } from "./Block";
import styles from "./Square.module.css";

import { createBlocks } from "../../utils/createBlocks";

export const AllGrid = ({ grid, blocks, click, focusObj }: any) => {
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
