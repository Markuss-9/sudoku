import { useNavigate } from "react-router-dom";
import { History } from "../../components/History";

import "./Home.css";
import { useState } from "react";
interface his {
	timestamp: number;
	difficulty: string;
	status: string;
}

function Home() {
	const navigate = useNavigate();
	const storedHistoryString = localStorage.getItem("history");
	// const lastHistory: his[] = storedHistoryString
	// 	? JSON.parse(storedHistoryString)
	// 	: [];

	const [history, setHistory] = useState<Array<his>>(
		storedHistoryString ? JSON.parse(storedHistoryString) : []
	);
	// console.log("🚀 ~ Home ~ history:", history);
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
			<History data={history} />
		</div>
	);
}

export default Home;
