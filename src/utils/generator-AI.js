function shuffleArray(arr) {
	// Helper function to shuffle an array in place using the Fisher-Yates algorithm
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
}

function isValidMove(board, row, col, num) {
	// Check if the number is not already present in the same row or column
	for (let i = 0; i < 9; i++) {
		if (board[row][i] === num || board[i][col] === num) {
			return false;
		}
	}

	// Check if the number is not already present in the same 3x3 subgrid
	const startRow = 3 * Math.floor(row / 3);
	const startCol = 3 * Math.floor(col / 3);
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			if (board[startRow + i][startCol + j] === num) {
				return false;
			}
		}
	}

	return true;
}

function solveSudoku(board) {
	for (let row = 0; row < 9; row++) {
		for (let col = 0; col < 9; col++) {
			if (board[row][col] === 0) {
				// Try placing numbers from 1 to 9 in the empty cell
				for (let num = 1; num <= 9; num++) {
					if (isValidMove(board, row, col, num)) {
						board[row][col] = num;
						if (solveSudoku(board)) {
							return true;
						}
						board[row][col] = 0;
					}
				}
				return false;
			}
		}
	}
	return true;
}

function copyGrid(grid) {
	// Helper function to create a deep copy of the grid
	return grid.map((row) => row.slice());
}

function generateSudoku() {
	// Create an empty 9x9 board
	const board = Array.from({ length: 9 }, () => Array(9).fill(0));

	// Randomize the first row
	const firstRow = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	shuffleArray(firstRow);

	for (let i = 0; i < 9; i++) {
		board[0][i] = firstRow[i];
	}

	// Generate a valid Sudoku puzzle using backtracking
	solveSudoku(board);

	// Create a copy of the solved grid
	const solvedGrid = copyGrid(board);

	// Remove random numbers from the filled Sudoku board to create the puzzle
	const emptyCells = Math.floor(Math.random() * 21) + 20; // Adjust the range as desired for difficulty
	let cellsRemoved = 0;
	while (cellsRemoved < emptyCells) {
		const row = Math.floor(Math.random() * 9);
		const col = Math.floor(Math.random() * 9);
		if (board[row][col] !== 0) {
			board[row][col] = 0;
			cellsRemoved++;
		}
	}

	return { solvedGrid, puzzleGrid: board };
}

function printSudoku(board) {
	for (let row = 0; row < 9; row++) {
		console.log(board[row].map((num) => (num !== 0 ? num : ".")).join(" "));
	}
}

export const { solvedGrid, puzzleGrid } = generateSudoku();
console.log("Generated Sudoku puzzle (Unsolved):");
printSudoku(puzzleGrid);

console.log("\nSolved Sudoku puzzle:");
printSudoku(solvedGrid);

// const fs = require("fs");

// fs.writeFile(
// 	"sudoku-AI-solvedGrid.json",
// 	JSON.stringify(solvedGrid, null, "\t"),
// 	(err) => {
// 		if (err) {
// 			console.error(err);
// 		}
// 	}
// );

// fs.writeFile(
// 	"sudoku-AI-puzzleGrid.json",
// 	JSON.stringify(puzzleGrid, null, "\t"),
// 	(err) => {
// 		if (err) {
// 			console.error(err);
// 		}
// 	}
// );
