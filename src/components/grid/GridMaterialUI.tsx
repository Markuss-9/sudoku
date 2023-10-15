import React from "react";
import { Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/system";

interface coords {
	x: number;
	y: number;
}

interface merge {
	puzzle: number;
	solved: number;
}

interface Grid {
	grid: merge[][];
	click: Function;
	focusObj: coords;
}

const SudokuGrid = ({ grid, click, focusObj }: Grid) => {
	return <></>;
};

export default SudokuGrid;
