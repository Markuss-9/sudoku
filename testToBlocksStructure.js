const grid = require("./test.json");

const fs = require("fs");

const createBlocks = () => {
	let gridWithIndexes = [];
	grid.forEach((row, y) => {
		gridWithIndexes.push([]);
		row.forEach((cell, x) => {
			gridWithIndexes[y].push({ value: cell, x: x, y: y });
		});
	});

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
			// console.log(blocks);
		}
	}

	fs.writeFile(
		"test-blocks222222.json",
		JSON.stringify(blocks, null, "\t"),
		(err) => {
			if (err) {
				console.error(err);
			}
		}
	);

	return blocks;
};

createBlocks();
createBlocks();
createBlocks();
createBlocks();
createBlocks();
createBlocks();
createBlocks();
