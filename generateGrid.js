// const fs = require("fs");

const { Console } = require("console");
// get fs module for creating write streams
const { promises: fs } = require("fs");

const write = async (text) => {
	await fs.appendFile("file.txt", text);
};

// make a new logger
// const myLogger = new Console({
// 	stdout: fs.createWriteStream("normalStdout.txt"),
// 	stderr: fs.createWriteStream("errStdErr.txt"),
// });

const N = 9;
// const M = 3;

// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// const shuffledArr = arr.sort(() => Math.random() - 0.5);

// const array = [
// 	[arr[0], arr[1], arr[2]],
// 	[arr[3], arr[4], arr[5]],
// 	[arr[6], arr[7], arr[8]],
// ];

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
const grid = [];

// Delay = (ms) => new Promise((res) => setTimeout(res, ms));

// var newNumber = 5;
// const check = (i) => {
// 	do {
// 		newNumber = getRandomIntInclusive(1, 9);
// 		console.log(`running ${newNumber}`);
// 	} while (grid[i].includes(newNumber));
// 	grid[i].push(newNumber);
// };

const checkVertical = (j, newNumber) => {
	for (let k = 0; k < grid.length - 1; k++) {
		if (grid[k][j] === newNumber) {
			return true;
		}
	}
	return false;
};

var newNumber;

var possibilities = [];

const runPossibilities = (row) => {
	possibilities = [];
	for (let l = 0; l < N; l++) {
		// possibilities.push([]);
		const possible = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		for (let row = 0; row < grid.length - 1; row++) {
			if (possible.includes(grid[row][l])) {
				const index = possible.indexOf(grid[row][l]);
				possible.splice(index, 1);
			}
		}

		// console.log("🚀 ~ runPossibilities ~ possibilities:", possibilities);
		// console.log("🚀 ~ runPossibilities ~ possible:", possible);
		possibilities.push(possible);
	}
};

const checkIfNeeded = (currentColumn, newNumber) => {
	console.log(`checkIfNeeded`);
	if (currentColumn === N - 2) {
		// console.log(possibilities);
		for (let i = currentColumn; i < N; i++) {
			if (
				possibilities[currentColumn].length <= 1 &&
				possibilities[currentColumn].includes(newNumber)
			) {
				return true;
			}
		}
	} else if (currentColumn < N - 2) {
		// console.log(possibilities);
		for (let i = currentColumn; i < N; i++) {
			if (
				possibilities[currentColumn].length <= 2 &&
				possibilities[currentColumn].includes(newNumber)
			) {
				return true;
			}
		}
	} else {
		console.log(`running false`);
		return false;
	}
};

const removeFromPossibilities = (currentColumn, newNumber) => {
	for (let i = currentColumn; i < N; i++) {
		if (possibilities[i].includes(newNumber)) {
			const index = possibilities[i].indexOf(newNumber);
			possibilities[i].splice(index, 1);
		}
	}
};

var correctRow = true;
var j = 0;

const checkIfNotUsable = (i) => {
	// console.log("🚀 ~ checkIfNotUsable ~ possibilities:", possibilities);
	for (let l = 0; l < N; l++) {
		// console.log(
		// 	"🚀 ~ checkIfNotUsable ~ possibilities[l].length:",
		// 	possibilities[l].length
		// );
		if (possibilities.length > 0) {
			if (possibilities[l].length == 0) {
				// grid.splice(i, 1);
				grid[i] = [];
				j = 0;
				// console.log(possibilities);
				runPossibilities(i);
				// console.log(`not usable`);
				// console.log(grid);
			}
		}
	}
};

for (let i = 0; i < N; i++) {
	grid.push([]);

	if (i > 0) runPossibilities(i);

	// correctRow = true;
	j = 0;

	while (j < N) {
		do {
			newNumber = getRandomIntInclusive(1, 9);
			// console.log(`running ${newNumber} at i=${i} and j=${j}`);
			// console.log(`orizzontal ${grid[i].includes(newNumber)}`);
			// console.log(
			// 	`vertical ${i === 0 ? false : checkVertical(j, newNumber)}`
			// );
			// console.log(grid);
			// for (let k = 0; k < grid.length - 1; k++) {
			// 	if (grid[k][j] === newNumber) {
			// 		console.log(`${grid[k][j]} === ${newNumber} true`);
			// 	} else {
			// 		console.log(`${grid[k][j]} === ${newNumber} false`);
			// 	}
			// }
			if (i > 0) checkIfNotUsable(i);

			// console.log(possibilities);
			// console.log(j);
			if (
				grid[i].includes(newNumber) &&
				(i === 0 ? false : checkVertical(j, newNumber))
			) {
				grid[i] = [];
				j = 0;
				runPossibilities(i);
			}
		} while (
			grid[i].includes(newNumber) ||
			(i === 0 ? false : checkVertical(j, newNumber))
		);

		// console.log(`inserting ${newNumber} at i=${i} and j=${j}`);
		// console.log(`orizzontal ${grid[i].includes(newNumber)}`);
		// console.log(
		// 	`vertical ${i === 0 ? false : checkVertical(j, newNumber)}`
		// );

		// for (let k = 0; k < grid.length - 1; k++) {
		// 	if (grid[k][j] === newNumber) {
		// 		console.log(`${grid[k][j]} true`);
		// 	} else {
		// 		console.log(`${grid[k][j]} false`);
		// 	}
		// }
		grid[i].push(newNumber);
		// console.log(grid);
		// console.log(`finito ${j}`);

		if (i > 0) removeFromPossibilities(j, newNumber);
		j++;
	}

	console.log(`\n-------------------`);
	console.log(grid);
	fs.appendFile(
		"grid.json",
		JSON.stringify(grid, null, "\t"),
		function (err) {
			if (err) throw err;
			console.log("IS WRITTEN");
		}
	);
	write(JSON.stringify(grid, null, "\t"));
}

fs.writeFile("test.json", JSON.stringify(grid, null, "\t"), (err) => {
	if (err) {
		console.error(err);
	}
});
