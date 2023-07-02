const grid = require("./test.json");

const fs = require("fs");
const gridWithIndexes = grid;

grid.forEach((row, y) => {
	row.forEach((cell, x) => {
		gridWithIndexes[y][x] = { value: cell, x: x, y: y };
	});
});

const blocks = []; //TODO: che schifo, sistemare
const createBlocks = (gridWithIndexes) => {
	console.log(`da`);
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
			// console.log(blocks);
		}
	}

	fs.writeFile(
		"test-blocks.json",
		JSON.stringify(blocks, null, "\t"),
		(err) => {
			if (err) {
				console.error(err);
			}
		}
	);
	return blocks;
};

createBlocks(gridWithIndexes);
