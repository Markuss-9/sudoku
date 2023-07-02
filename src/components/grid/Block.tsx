import { Square } from "./Square";
import styles from "./Square.module.css";

interface oggetto2 {
	block: Array<Array<object>>;
	click: Function;
	focusObj: any;
}

export const Block = ({ block, click, focusObj }: oggetto2) => {
	const cells: any = [];
	console.log(block);

	block.forEach((row: Array<object>) => {
		row.forEach((element: object) => {
			console.log(element);
			cells.push(
				<Square
					value={1}
					click={click}
					y={1}
					x={1}
					focus={focusObj.x === 1 && focusObj.y === 1 ? true : false}
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
				{/* {cells} */}
				{/* {row.map((element: number) => {
					return <Square value={element} click={click} />;
				})} */}
			</div>
		</>
	);
};
