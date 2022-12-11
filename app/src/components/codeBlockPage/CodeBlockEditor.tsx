import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "@uiw/react-textarea-code-editor";
import axios from "axios";
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
	}, []);

	useEffect(() => {
		setEditorValue(codeBlock ? codeBlock.changedCode : "!$loadingState");
	}, [codeBlock]);

	const onChange = (e: string) => {
		setEditorValue(e);
	};

	return (
		<div className="CodeBlockEditor">
			{editorValue === "!$loadingState" ? (
				<div className="loader"></div>
			) : (
				<CodeEditor
					value={editorValue}
					onChange={(e) => {
						onChange(e.currentTarget.value);
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
