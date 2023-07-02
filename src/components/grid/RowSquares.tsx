import { Square } from "./Square";

interface oggetto2 {
	row: Array<number>; //TODO: NON FUNZIONA SE DICHIARATO COME Number
	click: Function;
	y: number;
	focusObj: any;
}

export const RowSquares = ({ row, click, y, focusObj }: oggetto2) => {
	const cells: any = [];
	row.forEach((element: number, index: number) => {
		cells.push(
			<Square
				value={element}
				click={click}
				y={y}
				x={index}
				focus={focusObj.x === index && focusObj.y === y ? true : false}
			/>
		);
	});
	return (
		<>
			{/* <Square value={"5"} />
			<Square value={"5"} />
			<Square /> */}
			<div>
				{cells}
				{/* {row.map((element: number) => {
					return <Square value={element} click={click} />;
				})} */}
			</div>
		</>
	);
};
