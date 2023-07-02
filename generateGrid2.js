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
var grid = [];
var vertical = [[], [], [], [], [], [], [], [], []];

var isPlayable = false;

// Delay = (ms) => new Promise((res) => setTimeout(res, ms));

// var newNumber = 5;
// const check = (i) => {
// 	do {
// 		newNumber = getRandomIntInclusive(1, 9);
// 		console.log(`running ${newNumber}`);
// 	} while (grid[i].includes(newNumber));
// 	grid[i].push(newNumber);
// };

const toFindDuplicates = (arr) => {
	return arr.filter((item, index) => arr.indexOf(item) !== index);
};

const checkVertical = () => {
	// console.log(grid);
	for (let i = 0; i < N; i++) {
		if (toFindDuplicates(vertical[i]).length !== 0) {
			return false;
		}
	}
	return true;
};
// const checkVertical = () => {
// 	// console.log(grid);
// 	for (let i = 0; i < N; i++) {
// 		for (let j = 0; j < N; j++) {
// 			for (let k = 0; k < N; k++) {
// 				if (grid[j][i] == grid[k][i]) {
// 					return false;
// 				}
// 			}
// 		}
// 	}
// 	return true;
// };

var newNumber;

while (!isPlayable) {
	grid = [];
	vertical = [[], [], [], [], [], [], [], [], []];
	for (let i = 0; i < N; i++) {
		grid.push([]);

		for (let j = 0; j < N; j++) {
			do {
				newNumber = getRandomIntInclusive(1, 9);
			} while (grid[i].includes(newNumber));
			grid[i].push(newNumber);
			vertical[j].push(newNumber);
		}

		// console.log(`\n-------------------`);
		// console.log(grid);
		// fs.appendFile(
		// 	"grid.json",
		// 	JSON.stringify(grid, null, "\t"),
		// 	function (err) {
		// 		if (err) throw err;
		// 		console.log("IS WRITTEN");
		// 	}
		// );
		// write(JSON.stringify(grid, null, "\t"));l
	}

	if (checkVertical()) isPlayable = true;
}

console.log("finito");

fs.writeFile("test.json", JSON.stringify(grid, null, "\t"), (err) => {
	if (err) {
		console.error(err);
	}
});
