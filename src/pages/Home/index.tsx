import { useNavigate } from "react-router-dom";
import { History } from "../../components/History";

import "./Home.css";
import { useState } from "react";

interface time {
	minutes: number;
	seconds: number;
	raw: number;
}

interface his {
	timestamp: number;
	difficulty: string;
	status: string;
	time: time;
	comment: string;
}

function Home() {
	const navigate = useNavigate();
	const storedHistoryString = localStorage.getItem("history");
	// const lastHistory: his[] = storedHistoryString
	// 	? JSON.parse(storedHistoryString)
	// 	: [];

	const [history, setHistory] = useState<Array<his>>(
		storedHistoryString ? JSON.parse(storedHistoryString) : null
	);

	const updateHistoryWithComment = (timestamp: number, comment: string) => {
		let newHistory = history;
		const indexToUpdate = newHistory.findIndex(
			(item) => item.timestamp === timestamp
		);

		newHistory[indexToUpdate].comment = comment;
		localStorage.setItem("history", JSON.stringify(newHistory));
		setHistory([...newHistory]);
	};

	return (
		<div className="Home">
			<h1>Sudoku</h1>
			<input
				type="button"
				value={`Easy`}
				onClick={() => {
					navigate("/game/easy");
				}}
			/>
			<input
				type="button"
				value={`Medium`}
				onClick={() => {
					navigate("/game/medium");
				}}
			/>
			<input
				type="button"
				value={`Hard`}
				onClick={() => {
					navigate("/game/hard");
				}}
			/>
			<br />
			<br />

			<br />
			<br />
			{history && (
				<History
					data={history}
					updateHistoryWithComment={updateHistoryWithComment}
				/>
			)}
		</div>
	);
}

export default Home;
