import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import Game from "./pages/Game";

import packageJson from "../package.json";

import { useEffect, useState } from "react";
import { Grid, Paper } from "@mui/material";

function App() {
	console.log(packageJson.version);

	const getCurrentTheme = () =>
		window.matchMedia("(prefers-color-scheme: dark)").matches;
	const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
	const mqListenerTheme = (e: any) => setIsDarkTheme(e.matches);

	useEffect(() => {
		const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
		darkThemeMq.addEventListener("change", (e) => mqListenerTheme(e));
		return () => darkThemeMq.removeEventListener("change", mqListenerTheme);
	}, []);
	return (
		<div className="App">
			<div className={isDarkTheme ? `darkTheme` : `lightTheme`}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home />}>
							{/* <Route index element={<Home />} /> */}
						</Route>
						<Route path="/game/:difficulty" element={<Game />} />
						<Route path="/*" element={<Navigate to="/" />} />
					</Routes>
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
