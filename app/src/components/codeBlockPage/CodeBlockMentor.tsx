import { useEffect, useState, useLayoutEffect, useContext } from "react";
import axios from "axios";
import hljs from "highlight.js";
import { socketContext } from "../App";
import "./styles/codeBlockMentor.scss";

interface codeBlockType {
	title: string;
	initialCode: string;
	changedCode: string;
	solutionCode: string;
}

interface codeBlockMentorProps {
	title: string;
}

const CodeBlockMentor = ({ title }: codeBlockMentorProps) => {
	const [codeBlock, setCodeBlock] = useState<codeBlockType>();
	const [displayValue, setDisplayValue] = useState<string>();
	const socket = useContext(socketContext);

	//highlight.js
	useLayoutEffect(() => {
		hljs.highlightAll();
	});

	//chagne displayed code accordingly to changes other users make
	useEffect(() => {
		getRelevantCodeBlock();
		socket.on("changedCode", (changedCode) => {
			setDisplayValue(changedCode);
		});
	}, []);

	useEffect(() => {
		setDisplayValue(codeBlock ? codeBlock.changedCode : "!$loadingState");
	}, [codeBlock]);

	//check for currect answer
	useEffect(() => {
		if (displayValue && displayValue === codeBlock?.solutionCode) {
			alert("Success!!");
		}
	});

	//request the relevant code block from server
	const getRelevantCodeBlock = async () => {
		setCodeBlock(
			(
				await axios.get("/codeBlock", {
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
					<div className="loader codeBlockPage"></div>
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
