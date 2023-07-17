const fs = require("fs");
const grid = [
	[500, 6, 7, 5, 4, 1, 8, 3, 9],
	[8, 4, 1, 3, 9, 2, 5, 7, 6],
	[3, 9, 5, 8, 7, 6, 2, 4, 1],
	[6, 8, 4, 9, 5, 3, 7, 1, 2],
	[1, 7, 9, 2, 6, 8, 4, 5, 3],
	[5, 2, 3, 4, 1, 7, 6, 9, 8],
	[7, 5, 8, 1, 2, 9, 3, 6, 4],
	[4, 1, 2, 6, 3, 5, 9, 8, 7],
	[9, 3, 6, 7, 8, 4, 1, 2, 5],
];
//! sia con require che con fs.readFileSync non funziona. integrare la generazione cosi' da evitare json
// const grid = require("../test.json");

export const createBlocks = () => {
	// const outputList = [];

	// for (let y = 0; y < grid.length; y++) {
	// 	const row = grid[y];
	// 	const outputRow = [];

	// 	for (let x = 0; x < row.length; x++) {
	// 		const value = row[x];
	// 		const outputElement = {
	// 			value: value,
	// 			x: x,
	// 			y: y,
	// 		};

	// 		outputRow.push(outputElement);
	// 	}

	// 	outputList.push(outputRow);
	// }

	let gridWithIndexes = [];
	grid.forEach((row, y) => {
		gridWithIndexes.push([]);
		row.forEach((cell, x) => {
			gridWithIndexes[y].push({ value: cell, x: x, y: y });
		});
	});
	// console.log("🚀 ~ row.forEach ~ gridWithIndexes:", gridWithIndexes[0][0]);

	const blocks = [];

	for (let row = 0; row < grid.length / 3; row++) {
		blocks.push([]);
		for (let column = 0; column < grid.length / 3; column++) {
			let startRow = row * 3;
			let startColumn = column * 3;
			blocks[row].push(
				gridWithIndexes
					.slice(startRow, startRow + 3)
					.map((r) => r.slice(startColumn, startColumn + 3))
			);
		}
	}
	return blocks;
};
