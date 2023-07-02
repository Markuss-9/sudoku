import { useState } from "react";
import { Block } from "./Block";
import styles from "./Square.module.css";

export const AllGrid = ({ blocks, click, focusObj }: any) => {
	const blocksMapped = blocks.map((row: any) => {
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
