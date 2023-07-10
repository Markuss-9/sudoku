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

	const updateNumber = (num: number) => {
		let newGrid = [...blocks];
		let fictionalX = Math.floor(squareFocus.x / 3);
		let fictionalY = Math.floor(squareFocus.y / 3);

		// let block = newGrid[fictionalY][fictionalX];
		newGrid[fictionalY][fictionalX][squareFocus.y - fictionalY * 3][
			squareFocus.x - fictionalX * 3
		].value = num;

		setBlocks(newGrid);

		let newGridIndexes = gridWithIndexesState;
		newGridIndexes[squareFocus.y][squareFocus.x] = num;
		setGridWithIndexesState(newGridIndexes);
		// createBlocks(gridWithIndexes);
		// console.log(blocksState);
	};

	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			//if I insert isFinite(Number(event.key)) it does consider the 0, but in sudoku I don't want it

			if (Number(event.key) && squareFocus.x !== null)
				updateNumber(Number(event.key));
			else if (
				(event.key === "ArrowUp" || event.key === "w") &&
				squareFocus.y > 0
			)
				setSquareFocus({
					x: squareFocus.x,
					y: squareFocus.y - 1,
				});
			else if (
				(event.key === "ArrowDown" || event.key === "s") &&
				squareFocus.y < 8
			)
				setSquareFocus({
					x: squareFocus.x,
					y: squareFocus.y + 1,
				});
			else if (
				(event.key === "ArrowLeft" || event.key === "a") &&
				squareFocus.x > 0
			)
				setSquareFocus({
					x: squareFocus.x - 1,
					y: squareFocus.y,
				});
			else if (
				(event.key === "ArrowRight" || event.key === "d") &&
				squareFocus.x < 8
			)
				setSquareFocus({
					x: squareFocus.x + 1,
					y: squareFocus.y,
				});

			console.log(event);
		};

		window.addEventListener("keyup", handleKeyPress);

		return () => {
			window.removeEventListener("keyup", handleKeyPress); //unmonunt, instead it updates all the past focused items
		};
	}, [squareFocus, updateNumber]);

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
