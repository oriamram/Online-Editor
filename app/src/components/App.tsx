import React from "react";
import HomePage from "./homePage/HomePage";
import CodeBlockPage from "./codeBlockPage/CodeBlockPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../main.scss";

const App = () => {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/:title" element={<CodeBlockPage />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default App;
