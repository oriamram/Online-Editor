import React from "react";
import CodeBlock from "../codeBlock/CodeBlock";
import "./styles/app.scss";

const App = () => {
	return (
		<div className="App">
			<h1 className="web-title">Choose Code Block</h1>
			<div className="codeBlocks-container">
				<CodeBlock />
				<CodeBlock />
				<CodeBlock />
				<CodeBlock />
			</div>
		</div>
	);
};

export default App;
