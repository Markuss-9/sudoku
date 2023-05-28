const fs = require("fs");

const N = 9;
const M = 3;

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const shuffledArr = arr.sort(() => Math.random() - 0.5);

const array = [
	[arr[0], arr[1], arr[2]],
	[arr[3], arr[4], arr[5]],
	[arr[6], arr[7], arr[8]],
];

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}
const grid = [];

Delay = (ms) => new Promise((res) => setTimeout(res, ms));

var newNumber = 5;
const check = (i) => {
	do {
		newNumber = getRandomIntInclusive(1, 9);
		console.log(`running ${newNumber}`);
	} while (grid[i].includes(newNumber));
	grid[i].push(newNumber);
};

for (let i = 0; i < N; i++) {
	grid.push([]);
	for (let j = 0; j < N; j++) {
		console.log(grid.length);
		check(i);
		console.log(`finito ${j}`);
	}
}

fs.writeFile("test.json", JSON.stringify(grid, null, "\t"), (err) => {
	if (err) {
		console.error(err);
	}
});
