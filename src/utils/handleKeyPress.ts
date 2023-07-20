export const handleKeyPress = (
	event: KeyboardEvent,
	setSquareFocus: Function,
	updateNumber: Function,
	squareFocus: { x: number; y: number }
) => {
	//if I insert isFinite(Number(event.key)) it does consider the 0, but in sudoku I don't want it

	if (Number(event.key) && squareFocus.x !== null)
		updateNumber(Number(event.key));
	else if (
		(event.key === "ArrowUp" || event.key === "w") &&
		squareFocus.y > 0
	)
		setSquareFocus({
			x: squareFocus.x,
			y: squareFocus.y - 1,
		});
	else if (
		(event.key === "ArrowDown" || event.key === "s") &&
		squareFocus.y < 8
	)
		setSquareFocus({
			x: squareFocus.x,
			y: squareFocus.y + 1,
		});
	else if (
		(event.key === "ArrowLeft" || event.key === "a") &&
		squareFocus.x > 0
	)
		setSquareFocus({
			x: squareFocus.x - 1,
			y: squareFocus.y,
		});
	else if (
		(event.key === "ArrowRight" || event.key === "d") &&
		squareFocus.x < 8
	)
		setSquareFocus({
			x: squareFocus.x + 1,
			y: squareFocus.y,
		});

	console.log(event);
};
