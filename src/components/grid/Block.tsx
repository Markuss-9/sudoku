import { Square } from "./Square";
import styles from "./Square.module.css";

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
			);
		});
	});
	return (
		<>
			<div
				className={isTabletOrMobile ? styles.blockMobile : styles.block}
			>
				{cells}
			</div>
		</>
	);
};
