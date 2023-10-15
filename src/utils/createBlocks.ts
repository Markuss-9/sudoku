//! sia con require che con fs.readFileSync non funziona. integrare la generazione cosi' da evitare json
// const grid = require("../test.json");

interface merge {
	puzzle: number;
	solved: number;
}

type matrixGrid = merge[][];

interface cellStruct {
	value: number;
	solved: number;
	x: number;
	y: number;
}

type matrixIndexes = cellStruct[][];
type block4dim = matrixIndexes[][];

export const createBlocks = (grid: matrixGrid) => {
	let provaGrid = [
		[
			{
				solved: 99,
				puzzle: 99,
			},
			{
				solved: 100,
				puzzle: 100,
			},
			{
				solved: 3254,
				puzzle: 3254,
			},
			{
				solved: 354,
				puzzle: 354,
			},
			{
				solved: 2,
				puzzle: 666,
			},
			{
				solved: 7,
				puzzle: 7,
			},
			{
				solved: 1,
				puzzle: 1,
			},
			{
				solved: 8,
				puzzle: 8,
			},
			{
				solved: 78,
				puzzle: 5,
			},
		],
		[
			{
				solved: 957,
				puzzle: 957,
			},
			{
				solved: 123,
				puzzle: 123,
			},
			{
				solved: 5,
				puzzle: 5,
			},
			{
				solved: 3,
				puzzle: 3,
			},
			{
				solved: 4,
				puzzle: 4,
			},
			{
				solved: 8,
				puzzle: 8,
			},
			{
				solved: 6,
				puzzle: 6,
			},
			{
				solved: 7,
				puzzle: 7,
			},
			{
				solved: 9,
				puzzle: 9,
			},
		],
		[
			{
				solved: 7,
				puzzle: 7,
			},
			{
				solved: 8,
				puzzle: 8,
			},
			{
				solved: 9,
				puzzle: 9,
			},
			{
				solved: 1,
				puzzle: 1,
			},
			{
				solved: 5,
				puzzle: 5,
			},
			{
				solved: 6,
				puzzle: 6,
			},
			{
				solved: 2,
				puzzle: 2,
			},
			{
				solved: 3,
				puzzle: 3,
			},
			{
				solved: 4,
				puzzle: 4,
			},
		],
		[
			{
				solved: 2,
				puzzle: 2,
			},
			{
				solved: 1,
				puzzle: 1,
			},
			{
				solved: 4,
				puzzle: 4,
			},
			{
				solved: 5,
				puzzle: 5,
			},
			{
				solved: 3,
				puzzle: 3,
			},
			{
				solved: 9,
				puzzle: 9,
			},
			{
				solved: 7,
				puzzle: 7,
			},
			{
				solved: 6,
				puzzle: 6,
			},
			{
				solved: 8,
				puzzle: 8,
			},
		],
		[
			{
				solved: 3,
				puzzle: 3,
			},
			{
				solved: 5,
				puzzle: 5,
			},
			{
				solved: 6,
				puzzle: 6,
			},
			{
				solved: 7,
				puzzle: 7,
			},
			{
				solved: 8,
				puzzle: 8,
			},
			{
				solved: 1,
				puzzle: 1,
			},
			{
				solved: 4,
				puzzle: 4,
			},
			{
				solved: 9,
				puzzle: 9,
			},
			{
				solved: 2,
				puzzle: 2,
			},
		],
		[
			{
				solved: 8,
				puzzle: 8,
			},
			{
				solved: 9,
				puzzle: 9,
			},
			{
				solved: 7,
				puzzle: 0,
			},
			{
				solved: 2,
				puzzle: 2,
			},
			{
				solved: 6,
				puzzle: 6,
			},
			{
				solved: 4,
				puzzle: 4,
			},
			{
				solved: 3,
				puzzle: 3,
			},
			{
				solved: 5,
				puzzle: 5,
			},
			{
				solved: 1,
				puzzle: 1,
			},
		],
		[
			{
				solved: 4,
				puzzle: 4,
			},
			{
				solved: 3,
				puzzle: 3,
			},
			{
				solved: 1,
				puzzle: 1,
			},
			{
				solved: 6,
				puzzle: 6,
			},
			{
				solved: 9,
				puzzle: 9,
			},
			{
				solved: 5,
				puzzle: 5,
			},
			{
				solved: 8,
				puzzle: 8,
			},
			{
				solved: 2,
				puzzle: 2,
			},
			{
				solved: 7,
				puzzle: 7,
			},
		],
		[
			{
				solved: 5,
				puzzle: 5,
			},
			{
				solved: 6,
				puzzle: 6,
			},
			{
				solved: 8,
				puzzle: 8,
			},
			{
				solved: 4,
				puzzle: 4,
			},
			{
				solved: 7,
				puzzle: 7,
			},
			{
				solved: 2,
				puzzle: 2,
			},
			{
				solved: 9,
				puzzle: 9,
			},
			{
				solved: 1,
				puzzle: 1,
			},
			{
				solved: 3,
				puzzle: 3,
			},
		],
		[
			{
				solved: 9,
				puzzle: 9,
			},
			{
				solved: 7,
				puzzle: 7,
			},
			{
				solved: 2,
				puzzle: 2,
			},
			{
				solved: 8,
				puzzle: 444,
			},
			{
				solved: 1,
				puzzle: 555,
			},
			{
				solved: 3,
				puzzle: 666,
			},
			{
				solved: 5,
				puzzle: 777,
			},
			{
				solved: 4,
				puzzle: 888,
			},
			{
				solved: 111,
				puzzle: 999,
			},
		],
	];
	let gridWithIndexes: matrixIndexes = [];
	grid.forEach((row, y) => {
		gridWithIndexes.push([]);
		row.forEach((cell, x) => {
			gridWithIndexes[y].push({
				value: cell.puzzle,
				solved: cell.solved,
				x: x,
				y: y,
			});
		});
	});

	const blocks: block4dim = [];
	// for (let row = 0; row < provaGrid.length / 3; row++) {
	// 	blocks.push([]);
	// 	for (let column = 0; column < provaGrid.length / 3; column++) {
	// 		let startRow = row * 3;
	// 		let startColumn = column * 3;
	// 		blocks[row].push(
	// 			gridWithIndexes
	// 				.slice(startRow, startRow + 3)
	// 				.map((r) => r.slice(startColumn, startColumn + 3))
	// 		);
	// 	}
	// }

	function divideArray(array: any) {
		const result = [];
		for (let i = 0; i < array.length; i += 3) {
			const row = [];
			for (let j = 0; j < array[i].length; j += 3) {
				const subMatrix = [
					[array[i][j], array[i][j + 1], array[i][j + 2]],
					[array[i + 1][j], array[i + 1][j + 1], array[i + 1][j + 2]],
					[array[i + 2][j], array[i + 2][j + 1], array[i + 2][j + 2]],
				];
				row.push(subMatrix);
			}
			result.push(row);
		}
		// console.log("🚀 ~ divideArray ~ result:", result);
		return result;
	}
	return divideArray(gridWithIndexes);
	// console.log("🚀 ~ createBlocks ~ blocks:", blocks);
	return blocks;
};
