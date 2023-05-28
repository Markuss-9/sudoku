import "./App.css";

import { RowSquares } from "./components/grid/RowSquares";

// import { grid } from "./generateGrid";

const grid: any = require("./test.json");

function App() {
	return (
		<div className="App">
			{grid.map((element: any) => {
				return <RowSquares row={element} />;
			})}
			{/* <RowSquares /> */}
		</div>
	);
}

export default App;
