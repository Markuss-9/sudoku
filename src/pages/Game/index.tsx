import { useNavigate, useParams } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import "./Game.css";

import { AllGrid } from "../../components/grid/AllGrid";
import { ButtonsActions } from "../../components/ButtonsActions/ButtonsActions";

import { handleKeyPress } from "../../utils/handleKeyPress";

import { generateSudoku } from "../../utils/generator-AI";

// import styled from "styled-components";

import Hearts from "../../components/Hearts/Hearts";

import { WinnerModal } from "../../components/winner/WinnerModal";

// const maxToAdd = 3,
// 	min = 2;
const { solvedGrid, puzzleGrid, emptyCells } = generateSudoku(30, 5);

function Game() {
	const { difficulty } = useParams();
	const [solvedGridState, setSolvedGrid] =
		useState<Array<Array<number>>>(solvedGrid);
	const [puzzleGridState, setPuzzleGrid] =
		useState<Array<Array<number>>>(puzzleGrid);
	const [movesToWin, setMovesToWin] = useState<number>(emptyCells);
	useEffect(() => {
		var maxToAdd = 3,
			min = 2;
		switch (difficulty) {
			case `easy`:
				maxToAdd = 5;
				min = 10;
				break;
			case `medium`:
				maxToAdd = 10;
				min = 15;
				break;
			case `hard`:
				maxToAdd = 20;
				min = 20;
				break;

			default:
				maxToAdd = 3;
				min = 2;
				break;
		}

		let { solvedGrid, puzzleGrid, emptyCells } = generateSudoku(
			maxToAdd,
			min
		);

		setSolvedGrid(solvedGrid);
		setPuzzleGrid(puzzleGrid);
		setMovesToWin(emptyCells);
	}, [difficulty]);

	const mergeGrid = () => {
		let merge = Array(9)
			.fill(``)
			.map(() => Array(9).fill(``));
		for (let i = 0; i < merge.length; i++) {
			for (let j = 0; j < merge[0].length; j++) {
				merge[i][j] = {
					solved: solvedGridState[i][j],
					puzzle: puzzleGridState[i][j],
				};
			}
		}
		return merge;
	};

	const navigate = useNavigate();

	const [squareFocus, setSquareFocus] = useState({ x: 0, y: 0 });
	const [grid, setGrid] = useState(mergeGrid());

	const [hearts, setHearts] = useState<number>(3);

	useEffect(() => {
		setGrid(mergeGrid());
	}, [difficulty, solvedGridState, puzzleGridState]);

	interface time {
		minutes: number;
		seconds: number;
		raw: number;
	}

	interface his {
		timestamp: number;
		difficulty: string;
		status: string;
		time: time;
	}

	const updateNumber = useCallback(
		(num: number) => {
			let newGridIndexes = grid;
			newGridIndexes[squareFocus.y][squareFocus.x].puzzle = num;
			setGrid(newGridIndexes);

			grid[squareFocus.y][squareFocus.x].puzzle !==
			grid[squareFocus.y][squareFocus.x].solved
				? setHearts(hearts - 1)
				: setMovesToWin(movesToWin - 1);

			if (!isRunning) setIsRunning(true);
		},
		[grid, squareFocus, hearts, movesToWin]
	);

	const [isStored, setStored] = useState(false);

	useEffect(() => {
		const storeLocalStorage = (status: string) => {
			if (!isStored) {
				setStored(true);
				let current: his = {
					timestamp: new Date().getTime(),
					difficulty: difficulty || "error on difficult",
					status: status,
					time: { minutes: minutes, seconds: seconds, raw: time },
				};

				const storedHistoryString = localStorage.getItem("history");
				const lastHistory: his[] = storedHistoryString
					? JSON.parse(storedHistoryString)
					: [];

				lastHistory.unshift(current);

				localStorage.setItem("history", JSON.stringify(lastHistory));
			}
		};

		if (!hearts) {
			setIsRunning(false);
			storeLocalStorage("Defeat");
		} else if (!movesToWin) {
			setIsRunning(false);
			storeLocalStorage("Victory");
		}
	}, [hearts, movesToWin, isStored]);

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

	// const Theme = styled.div`
	// 	background: ${isDarkTheme ? "#313131" : "#fff"};
	// `;
	const [close, setClose] = useState(true);

	const [time, setTime] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [seconds, setSeconds] = useState(0);

	const [isRunning, setIsRunning] = useState(false);

	useEffect(() => {
		let intervalId: any;
		if (isRunning) {
			intervalId = setInterval(() => {
				setMinutes(Math.floor((time % 360000) / 6000));
				setSeconds(Math.floor((time % 6000) / 100));
				setTime(time + 100);
			}, 1000);
		}
		return () => clearInterval(intervalId);
	}, [isRunning, time]);

	const startAndStop = () => {
		setIsRunning(!isRunning);
	};

	const reset = () => {
		setTime(0);
	};

	return (
		<div className="Game">
			<h1
				onClick={() => {
					navigate("/");
				}}
			>
				Sudoku
			</h1>
			<p>
				{minutes.toString().padStart(2, "0")}:
				{seconds.toString().padStart(2, "0")}
				{/* {time} */}
			</p>
			<br />
			<Hearts attempts={hearts} />
			<AllGrid
				grid={grid}
				click={movesToWin < 1 || hearts < 1 ? () => {} : setSquareFocus}
				focusObj={squareFocus}
			/>
			<br />
			<br />
			<ButtonsActions update={updateNumber} />
			<WinnerModal
				show={(!hearts || !movesToWin) && close}
				title={!hearts ? `Game Over` : !movesToWin ? `Victory` : ``}
				handleClose={setClose}
			/>
		</div>
	);
}

export default Game;
