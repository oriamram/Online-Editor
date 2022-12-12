import React, { useEffect, useState, useLayoutEffect, useContext } from "react";
import axios from "axios";
import hljs from "highlight.js";
import { socketContext } from "../App";

import "./styles/codeBlockMentor.scss";

interface codeBlockType {
	title: string;
	initialCode: string;
	changedCode: string;
}

interface codeBlockMentorProps {
	title: string;
}

const CodeBlockMentor = ({ title }: codeBlockMentorProps) => {
	const [codeBlock, setCodeBlock] = useState<codeBlockType>();
	const [displayValue, setDisplayValue] = useState<string>();
	const socket = useContext(socketContext);

	useLayoutEffect(() => {
		hljs.highlightAll();
	});

	useEffect(() => {
		getRelevantCodeBlock();
		socket.on("changedCode", (changedCode) => {
			setDisplayValue(changedCode);
		});
	}, []);

	useEffect(() => {
		setDisplayValue(codeBlock ? codeBlock.changedCode : "!$loadingState");
	}, [codeBlock]);

	//request the relevant code block from server
	const getRelevantCodeBlock = async () => {
		setCodeBlock(
			(
				await axios.get("/get_codeBlock", {
					params: {
						title,
					},
				})
			).data
		);
	};

	return (
		<div className="code">
			<div className="CodeBlockMentor">
				{displayValue === "!$loadingState" ? (
					<div className="loader"></div>
				) : (
					<pre>
						<code className="language-javascript">{displayValue}</code>
					</pre>
				)}
			</div>
		</div>
	);
};

export default CodeBlockMentor;
