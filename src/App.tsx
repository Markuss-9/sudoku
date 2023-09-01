import { useCallback, useEffect, useState } from "react";
import "./App.css";

import { AllGrid } from "./components/grid/AllGrid";
import { ButtonsActions } from "./components/ButtonsActions/ButtonsActions";

import { handleKeyPress } from "./utils/handleKeyPress";

import { generateSudoku } from "./utils/generator-AI";

// import styled from "styled-components";

import Hearts from "./components/Hearts/Hearts";

import { WinnerModal } from "./components/winner/WinnerModal";

const maxToAdd = 5,
	min = 5;
const { solvedGrid, puzzleGrid, emptyCells } = generateSudoku(maxToAdd, min);

function App() {
	const mergeGrid = () => {
		let merge = Array(9)
			.fill(``)
			.map(() => Array(9).fill(``));
		for (let i = 0; i < merge.length; i++) {
			for (let j = 0; j < merge[0].length; j++) {
				merge[i][j] = {
					solved: solvedGrid[i][j],
					puzzle: puzzleGrid[i][j],
				};
			}
		}
		return merge;
	};

	const [squareFocus, setSquareFocus] = useState({ x: 0, y: 0 });
	const [grid, setGrid] = useState(mergeGrid());
	const [movesToWin, setMovesToWin] = useState(emptyCells);

	const [hearts, setHearts] = useState<number>(3);

	const updateNumber = useCallback(
		(num: number) => {
			let newGridIndexes = grid;
			newGridIndexes[squareFocus.y][squareFocus.x].puzzle = num;
			setGrid(newGridIndexes);

			grid[squareFocus.y][squareFocus.x].puzzle !==
			grid[squareFocus.y][squareFocus.x].solved
				? setHearts(hearts - 1)
				: setMovesToWin(movesToWin - 1);
		},
		[grid, squareFocus, hearts, movesToWin]
	);

	if (!hearts) {
		// setSquareFocus({ x: -1, y: -1 });
		// window.alert(`Game Over`);
	}
	if (!movesToWin) window.alert(`Game Win`);

	useEffect(() => {
		const handleEvent = (event: KeyboardEvent) => {
			handleKeyPress(event, setSquareFocus, updateNumber, squareFocus);
		};

		movesToWin < 1 || hearts < 1
			? window.removeEventListener("keyup", handleEvent)
			: window.addEventListener("keyup", handleEvent);

		return () => {
			window.removeEventListener("keyup", handleEvent); //unmonunt, instead it updates all the past focused items
		};
	}, [squareFocus, updateNumber, movesToWin]);

	const getCurrentTheme = () =>
		window.matchMedia("(prefers-color-scheme: dark)").matches;
	const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
	const mqListenerTheme = (e: any) => setIsDarkTheme(e.matches);

	useEffect(() => {
		const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
		darkThemeMq.addEventListener("change", (e) => mqListenerTheme(e));
		return () => darkThemeMq.removeEventListener("change", mqListenerTheme);
	}, []);

	// const Theme = styled.div`
	// 	background: ${isDarkTheme ? "#313131" : "#fff"};
	// `;

	return (
		<div className="App">
			<div className={isDarkTheme ? `darkTheme` : `lightTheme`}>
				<h1>Sudoku</h1>
				<Hearts attempts={hearts} />
				<AllGrid
					grid={grid}
					click={
						movesToWin < 1 || hearts < 1 ? () => {} : setSquareFocus
					}
					focusObj={squareFocus}
				/>
				<br />
				<br />
				<ButtonsActions update={updateNumber} />
			</div>
			<WinnerModal show={!hearts} title={`Game Over`} />
		</div>
	);
}

export default App;
