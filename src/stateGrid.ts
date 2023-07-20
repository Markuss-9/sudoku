import { useEffect, useState } from "react";

export const UseStateGrid2 = (num: number) => {
	const [grid, setGrid] = useState(0);

	useEffect(() => {
		setGrid(num);
	}, []);
	return grid;
};
