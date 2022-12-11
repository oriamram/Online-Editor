import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import CodeEditor from "@uiw/react-textarea-code-editor";
import axios from "axios";

interface codeBlockType {
	title: string;
	initialCode: string;
	changedCode: string;
}

const CodeBlockPage = () => {
	const { title } = useParams();
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
		setEditorValue(codeBlock ? codeBlock.changedCode : "");
	}, [codeBlock]);

	return (
		<div className="CodeBlockPage">
			<CodeEditor
				value={editorValue}
				onChange={(e) => {
					setEditorValue(e.currentTarget.value);
				}}
				language="js"
				style={{
					fontSize: 12,
					backgroundColor: "#f5f5f5",
					fontFamily: "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
				}}
			/>
		</div>
	);
};

export default CodeBlockPage;
