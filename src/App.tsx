import { useEffect, useState } from "react";
import "./App.css";

import { RowSquares } from "./components/grid/RowSquares";
import { ButtonsActions } from "./components/ButtonsActions/ButtonsActions";
// import { Block } from "./components/grid/Block";

// import { grid } from "./generateGrid";

const grid: any = require("./test.json");

// const gridWithIndexes = grid;

// grid.forEach((row: Array<number>, y: number) => {
// 	row.forEach((cell: number, x: number) => {
// 		gridWithIndexes[y][x] = { value: cell, x: x, y: y };
// 	});
// });

function App() {
	const [squareFocus, setSquareFocus] = useState({ x: 0, y: 0 });
	const [gridTest, setGridTest] = useState(grid);
	// const [gridWithIndexesState, setGridWithIndexesState] =
	// 	useState(gridWithIndexes);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "1" && squareFocus.x !== null) {
				console.log("1");
				console.log(squareFocus);
				let newGrid = [...gridTest];
				newGrid[squareFocus.y][squareFocus.x] = 1;
				setGridTest(newGrid);
			}
		};

		window.addEventListener("keyup", handleKeyPress);

		return () => {
			window.removeEventListener("keyup", handleKeyPress); //unmonunt, instead it updates all the past focused items
		};
	}, [squareFocus]);

	const row: any = [];
	gridTest.forEach((element: Array<number>, index: number) => {
		row.push(
			<RowSquares
				row={element}
				click={setSquareFocus}
				y={index}
				focusObj={squareFocus}
			/>
		);
	});

	const updateNumber = (num: number) => {
		let newGrid = [...gridTest];
		newGrid[squareFocus.y][squareFocus.x] = num;
		setGridTest(newGrid);
		// createBlocks(gridWithIndexes);
	};

	// const blocks: Array<Array<Array<Array<object>>>> = []; //TODO: che schifo, sistemare
	// const createBlocks = (gridWithIndexes: Array<Array<object>>) => {
	// 	console.log(`da`);
	// 	for (let row = 0; row < grid.length / 3; row++) {
	// 		blocks.push([]);
	// 		for (let column = 0; column < grid.length / 3; column++) {
	// 			let startRow = row * 3;
	// 			let startColumn = column * 3;
	// 			blocks[row].push(
	// 				gridWithIndexes
	// 					.slice(startRow, startRow + 3)
	// 					.map((r: Array<object>) =>
	// 						r.slice(startColumn, startColumn + 3)
	// 					)
	// 			);
	// 			console.log(blocks);
	// 		}
	// 	}
	// };

	// const bl: any = [];
	// blocks.forEach((element: Array<Array<Array<object>>>) => {
	// 	element.forEach((element2: Array<Array<object>>) => {
	// 		bl.push(
	// 			<Block
	// 				block={element2}
	// 				click={setSquareFocus}
	// 				focusObj={squareFocus}
	// 			/>
	// 		);
	// 		console.log(element2);
	// 	});
	// });
	// console.log(bl);

	return (
		<div className="App">
			{row}
			{/* {grid.map((element: Array<Number>) => {
				return <RowSquares row={element} click={setSquareFocus} />;
			})} */}
			{/* <RowSquares /> */}
			{/* {bl} */}
			<br />
			<br />
			<ButtonsActions update={updateNumber} />
		</div>
	);
}

export default App;
