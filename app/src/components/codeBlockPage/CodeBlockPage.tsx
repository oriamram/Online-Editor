import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import CodeBlockEditor from "./CodeBlockEditor";
import { socketContext } from "../App";
import "./styles/codeBlockPage.scss";

const CodeBlockPage = () => {
	const { title } = useParams<string>();
	const socket = useContext(socketContext);

	useEffect(() => {
		socket.emit("connectedToCodeBlock", title);
		localStorage.setItem("lastCodeBlock", title!);
	}, []);

	return (
		<div className="CodeBlockPage">
			<CodeBlockEditor title={title!} />
		</div>
	);
};

export default CodeBlockPage;
