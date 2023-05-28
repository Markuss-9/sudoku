const provaArray = [[], [4, 5, 6]];

function getRandomIntInclusive(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

for (let i = 0; i < 9; i++) {
	let newNumber = getRandomIntInclusive(1, 9);
	do {
		newNumber = getRandomIntInclusive(1, 9);
		console.log(`running ${newNumber}`);
	} while (provaArray[0].includes(newNumber));

	// while (provaArray[0].includes(newNumber)) {
	// 	newNumber = getRandomIntInclusive(1, 9);
	// 	console.log(`running ${newNumber}`);
	// }
	// console.log(newNumber);
	provaArray[0].push(newNumber);
	console.log("🚀 ~ provaArray[0]:", provaArray[0]);
}

console.log(provaArray);
