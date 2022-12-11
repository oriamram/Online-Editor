import React, { useEffect, useState, useContext, useRef } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import axios from "axios";
import { socketContext } from "../App";
import "./styles/codeBlockEditor.scss";

interface codeBlockType {
	title: string;
	initialCode: string;
	changedCode: string;
}

interface codeBlockEditor {
	title: string;
}

const CodeBlockEditor = ({ title }: codeBlockEditor) => {
	const [codeBlock, setCodeBlock] = useState<codeBlockType>();
	const [editorValue, setEditorValue] = useState<string | undefined>();
	const socket = useContext(socketContext);
	const codeEditorRef = useRef<HTMLTextAreaElement>(null);
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

	useEffect(() => {
		getRelevantCodeBlock();
		socket.on("changedCode", (changedCode) => {
			setEditorValue(changedCode);
		});
	}, []);

	useEffect(() => {
		setEditorValue(codeBlock ? codeBlock.changedCode : "!$loadingState");
	}, [codeBlock]);

	const onChange = () => {
		setEditorValue(codeEditorRef.current?.value);
		socket.emit("changeInEditor", title, codeEditorRef.current?.value);
	};

	return (
		<div className="CodeBlockEditor">
			{editorValue === "!$loadingState" ? (
				<div className="loader"></div>
			) : (
				<CodeEditor
					ref={codeEditorRef}
					value={editorValue}
					onChange={() => {
						onChange();
					}}
					language="js"
					style={{
						fontSize: 23,
						fontFamily: "Righteous, cursive",
						overflowY: "scroll",
					}}
				/>
			)}
		</div>
	);
};

export default CodeBlockEditor;
