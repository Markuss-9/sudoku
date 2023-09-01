import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { createBlocks } from "./utils/createBlocks";

// import { RowSquares } from "./components/grid/RowSquares";
import { AllGrid } from "./components/grid/AllGrid";
import { ButtonsActions } from "./components/ButtonsActions/ButtonsActions";

import { handleKeyPress } from "./utils/handleKeyPress";

import { generateSudoku } from "./utils/generator-AI";

import styled from "styled-components";

// const grid: any = require("./test.json");

// const gridBlocks: any = require("./test-blocks.json");

const maxToAdd = 5,
	min = 5;
const { solvedGrid, puzzleGrid, emptyCells } = generateSudoku(maxToAdd, min);

function App() {
	const [squareFocus, setSquareFocus] = useState({ x: 0, y: 0 });
	const [gridTest, setGridTest] = useState(solvedGrid);
	// const [gridWithIndexesState, setGridWithIndexesState] =
	// 	useState(gridWithIndexes);

	interface cellStruct {
		value: number;
		x: number;
		y: number;
	}

	type matrix4dim = cellStruct[][][][];

	const [blocks, setBlocks] = useState<matrix4dim>(createBlocks(gridTest));

	const updateNumber = useCallback(
		(num: number) => {
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
		},
		[blocks, gridTest, squareFocus]
	);

	useEffect(() => {
		const handleEvent = (event: KeyboardEvent) => {
			handleKeyPress(event, setSquareFocus, updateNumber, squareFocus);
		};

		window.addEventListener("keyup", handleEvent);

		return () => {
			window.removeEventListener("keyup", handleEvent); //unmonunt, instead it updates all the past focused items
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

	const Theme = styled.div`
		background: ${isDarkTheme ? "#313131" : "#fff"};
	`;

	return (
		<div className="App">
			<Theme>
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
			</Theme>
		</div>
	);
}

export default App;
