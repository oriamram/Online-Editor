import React, { useEffect, useState } from "react";
import axios from "axios";
import CodeBlockOption from "../codeBlockOption/CodeBlockOption";
import "./styles/homePage.scss";

const HomePage = () => {
	const [allCodeBlocks, setAllCodeBlocks] = useState([]);

	const getAllCodeBlocks = async () => {
		setAllCodeBlocks(await (await axios.get("/get_all_codeBlocks")).data);
	};

	const renderCodeBlockOptions = () => {
		return allCodeBlocks.map(({ title }: { title: string }) => <CodeBlockOption key={title} title={title} />);
	};

	useEffect(() => {
		getAllCodeBlocks();
	}, []);

	return (
		<div className="HomePage">
			<h1 className="web-title">Choose Code Block</h1>
			{allCodeBlocks.length >= 1 ? <div className="codeBlocks-container">{renderCodeBlockOptions()}</div> : <div className="loader"></div>}
		</div>
	);
};

export default HomePage;
