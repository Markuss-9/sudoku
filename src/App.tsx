import { useEffect, useState } from "react";
import "./App.css";
import { createBlocks } from "./utils/createBlocks";

// import { RowSquares } from "./components/grid/RowSquares";
import { AllGrid } from "./components/grid/AllGrid";
import { ButtonsActions } from "./components/ButtonsActions/ButtonsActions";

const grid: any = require("./test.json");

const gridBlocks: any = require("./test-blocks.json");

function App() {
	const [squareFocus, setSquareFocus] = useState({ x: 0, y: 0 });
	const [gridTest, setGridTest] = useState(grid);
	// const [gridWithIndexesState, setGridWithIndexesState] =
	// 	useState(gridWithIndexes);

	interface cellStruct {
		value: number;
		x: number;
		y: number;
	}

	type matrix4dim = cellStruct[][][][];

	const [blocks, setBlocks] = useState<matrix4dim>(createBlocks(gridTest));

	const updateNumber = (num: number) => {
		let newGrid: matrix4dim = [...blocks];
		let fictionalX = Math.floor(squareFocus.x / 3);
		let fictionalY = Math.floor(squareFocus.y / 3);

		// let block = newGrid[fictionalY][fictionalX];
		newGrid[fictionalY][fictionalX][squareFocus.y - fictionalY * 3][
			squareFocus.x - fictionalX * 3
		].value = num;
		setBlocks(newGrid);
		// let newGridIndexes = gridWithIndexesState;
		// newGridIndexes[squareFocus.y][squareFocus.x] = num;
		// setGridWithIndexesState(newGridIndexes);

		let newGridIndexes = gridTest;
		newGridIndexes[squareFocus.y][squareFocus.x] = num;
		setGridTest(newGridIndexes);
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
				<h1>Sudoku</h1>
				<AllGrid
					grid={gridTest}
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
