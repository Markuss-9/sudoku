import { useEffect, useState } from "react";
import "./App.css";

// import { RowSquares } from "./components/grid/RowSquares";
import { AllGrid } from "./components/grid/AllGrid";
import { ButtonsActions } from "./components/ButtonsActions/ButtonsActions";
import { Block } from "./components/grid/Block";

// import { grid } from "./generateGrid";

const grid: any = require("./test.json");

const gridBlocks: any = require("./test-blocks.json");

const gridWithIndexes = grid;

grid.forEach((row: Array<number>, y: number) => {
	row.forEach((cell: number, x: number) => {
		gridWithIndexes[y][x] = { value: cell, x: x, y: y };
	});
});

function App() {
	const [squareFocus, setSquareFocus] = useState({ x: 0, y: 0 });
	// const [gridTest, setGridTest] = useState(grid);
	const [gridWithIndexesState, setGridWithIndexesState] =
		useState(gridWithIndexes);

	const [blocks, setBlocks] = useState(gridBlocks);

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "1" && squareFocus.x !== null) {
				console.log("1");
				console.log(squareFocus);
				let newGrid = [...gridWithIndexesState];
				newGrid[squareFocus.y][squareFocus.x].value = 1;
				setGridWithIndexesState(gridWithIndexesState);
			}
		};

		window.addEventListener("keyup", handleKeyPress);

		return () => {
			window.removeEventListener("keyup", handleKeyPress); //unmonunt, instead it updates all the past focused items
		};
	}, [squareFocus]);

	// const row: any = [];
	// gridTest.forEach((element: Array<number>, index: number) => {
	// 	row.push(
	// 		<RowSquares
	// 			row={element}
	// 			click={setSquareFocus}
	// 			y={index}
	// 			focusObj={squareFocus}
	// 		/>
	// 	);
	// });

	//! can't use this structure anymore, it doesn't contain indexes of the block we want to update
	const updateNumber = (num: number) => {
		let newGrid = [...gridWithIndexesState];
		newGrid[squareFocus.y][squareFocus.x].value = num;
		setBlocks(blocks);
		// createBlocks(gridWithIndexes);
		// console.log(blocksState);
	};

	// const blocks: Array<Array<Array<Array<object>>>> = []; //TODO: che schifo, sistemare
	// const createBlocks = (gridWithIndexesState: Array<Array<object>>) => {
	// 	console.log(`da`);
	// 	for (let row = 0; row < grid.length / 3; row++) {
	// 		blocks.push([]);
	// 		for (let column = 0; column < grid.length / 3; column++) {
	// 			let startRow = row * 3;
	// 			let startColumn = column * 3;
	// 			blocks[row].push(
	// 				gridWithIndexesState
	// 					.slice(startRow, startRow + 3)
	// 					.map((r: Array<object>) =>
	// 						r.slice(startColumn, startColumn + 3)
	// 					)
	// 			);
	// 			// console.log(blocks);
	// 		}
	// 	}

	// 	return blocks;
	// };
	// const [blocksState, setBlocksState] = useState(
	// 	createBlocks(gridWithIndexes)
	// );
	// setBlocksState(createBlocks(gridWithIndexes));

	// const bl: any = [];
	// blocksState.forEach((element: Array<Array<Array<object>>>) => {
	// 	element.forEach((element2: Array<Array<object>>) => {
	// 		bl.push(
	// 			<Block
	// 				block={element2}
	// 				click={setSquareFocus}
	// 				focusObj={squareFocus}
	// 			/>
	// 		);
	// 		// console.log(element2);
	// 	});
	// });
	// console.log(bl);

	const getCurrentTheme = () =>
		window.matchMedia("(prefers-color-scheme: dark)").matches;
	console.log("pppppppppppppppppppppppp", getCurrentTheme());
	const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
	const mqListenerTheme = (e: any) => {
		setIsDarkTheme(e.matches);
	};

	useEffect(() => {
		const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
		darkThemeMq.addEventListener("change", (e) => mqListenerTheme(e));
		return () => darkThemeMq.removeEventListener("change", mqListenerTheme);
	}, []);

	return (
		<div className="App">
			<div
				style={{
					background: isDarkTheme ? "#313131" : "#fff",
				}}
			>
				{/* {row} */}
				{/* {grid.map((element: Array<Number>) => {
				return <RowSquares row={element} click={setSquareFocus} />;
			})} */}
				{/* <RowSquares /> */}
				{/* {bl} */}
				<AllGrid
					blocks={blocks}
					click={setSquareFocus}
					focusObj={squareFocus}
				/>
				<br />
				<br />
				<ButtonsActions update={updateNumber} />
			</div>
		</div>
	);
}

export default App;
