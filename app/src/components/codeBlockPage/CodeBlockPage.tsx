import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeBlockEditor from "./CodeBlockEditor";
import CodeBlockMentor from "./CodeBlockMentor";
import { socketContext } from "../App";
import "./styles/codeBlockPage.scss";

const CodeBlockPage = () => {
	const { title } = useParams<string>();
	const socket = useContext(socketContext);
	const [spectators, setSpectators] = useState<number>(0);
	const [isFirst, setIsFirst] = useState(false);

	useEffect(() => {
		socket.emit("connectedToCodeBlock", title);
		socket.on("spectatorsCount", (spectatorsCount) => {
			setSpectators(spectatorsCount);
			if (spectatorsCount < 2) {
				setIsFirst(true);
			}
		});
		localStorage.setItem("lastCodeBlock", title!);
	}, []);

	return (
		<div className="CodeBlockPage">
			<h1 className="title">{title?.replace("_", " ")}</h1>
			{!isFirst ? <CodeBlockEditor title={title!} /> : <CodeBlockMentor title={title!} />}
			<h1 className="spectators">spectators: {spectators}</h1>
		</div>
	);
};

export default CodeBlockPage;
