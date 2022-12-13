import React, { useEffect } from "react";
import HomePage from "./homePage/HomePage";
import CodeBlockPage from "./codeBlockPage/CodeBlockPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { io } from "socket.io-client";
import "../main.scss";

const socket = io("http://localhost:4000");

export const socketContext = React.createContext(socket);

const App = () => {
	useEffect(() => {
		localStorage.clear();
	}, []);

	return (
		<socketContext.Provider value={socket}>
			<div className="App">
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/:title" element={<CodeBlockPage />} />
					</Routes>
				</BrowserRouter>
			</div>
		</socketContext.Provider>
	);
};

export default App;
