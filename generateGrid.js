// const fs = require("fs");

// const { Console } = require("console");
// get fs module for creating write streams
const fs = require("fs");

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
		possibilities.push([]);
		const possible = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		for (let row = 0; row < grid.length - 1; row++) {
			if (grid[row][l] === newNumber) {
				const index = possible.indexOf(newNumber);
				possible.splice(index, 1);
			}
		}

		console.log("🚀 ~ runPossibilities ~ possibilities:", possibilities);
		console.log("🚀 ~ runPossibilities ~ possible:", possible);
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
		const index = possibilities[i].indexOf(newNumber);
		possibilities[i].splice(index, 1);
	}
};

for (let i = 0; i < N; i++) {
	grid.push([]);

	if (i > 0) runPossibilities(i);

	for (let j = 0; j < N; j++) {
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
		} while (
			grid[i].includes(newNumber) ||
			(i === 0
				? false
				: checkVertical(j, newNumber) || checkIfNeeded(j, newNumber))
		);

		console.log(`inserting ${newNumber} at i=${i} and j=${j}`);
		console.log(`orizzontal ${grid[i].includes(newNumber)}`);
		console.log(
			`vertical ${i === 0 ? false : checkVertical(j, newNumber)}`
		);

		for (let k = 0; k < grid.length - 1; k++) {
			if (grid[k][j] === newNumber) {
				console.log(`${grid[k][j]} true`);
			} else {
				console.log(`${grid[k][j]} false`);
			}
		}
		grid[i].push(newNumber);
		console.log(grid);
		// console.log(`finito ${j}`);

		if (i > 0) removeFromPossibilities(j, newNumber);
	}
}

fs.writeFile("test.json", JSON.stringify(grid, null, "\t"), (err) => {
	if (err) {
		console.error(err);
	}
});
