import { Square } from "./Square";
import styles from "./Square.module.css";

interface singleCellProps {
	value: number;
	x: number;
	y: number;
}

interface oggetto2 {
	block: Array<Array<any>>;
	click: Function;
	focusObj: any;
}

export const Block = ({ block, click, focusObj }: any) => {
	// console.log(block);

	const cells: any = block.map((row: any) => {
		return row.map((element: any) => {
			// console.log(element.value);
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
				/>
			);
		});
	});
	return (
		<>
			{/* <Square value={"5"} />
			<Square value={"5"} />
			<Square /> */}
			<div className={styles.block}>
				{/* <div>shit</div> */}
				{cells}
				{/* {row.map((element: number) => {
					return <Square value={element} click={click} />;
				})} */}
			</div>
		</>
	);
};
