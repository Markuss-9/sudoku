const fs = require("fs");

//! sia con require che con fs.readFileSync non funziona. integrare la generazione cosi' da evitare json
// const grid = require("../test.json");

type matrixGrid = number[][];

interface cellStruct {
	value: number;
	x: number;
	y: number;
}

type matrixIndexes = cellStruct[][];
type block4dim = matrixIndexes[][];

export const createBlocks = (grid: matrixGrid) => {
	let gridWithIndexes: matrixIndexes = [];
	grid.forEach((row, y) => {
		gridWithIndexes.push([]);
		row.forEach((cell, x) => {
			gridWithIndexes[y].push({ value: cell, x: x, y: y });
		});
	});

	const blocks: block4dim = [];
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
