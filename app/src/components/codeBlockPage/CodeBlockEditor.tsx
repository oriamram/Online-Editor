import React, { useEffect, useState, useContext, useRef } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import axios from "axios";
import { FcRefresh } from "react-icons/fc";
import { socketContext } from "../App";
import "./styles/codeBlockEditor.scss";

interface codeBlockType {
	title: string;
	initialCode: string;
	changedCode: string;
}

interface codeBlockEditorProps {
	title: string;
}

const CodeBlockEditor = ({ title }: codeBlockEditorProps) => {
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

	const onChange = (value: string) => {
		setEditorValue(value);
		socket.emit("changeInEditor", title, value);
	};

	return (
		<div className="code">
			<div className="CodeBlockEditor">
				{editorValue === "!$loadingState" ? (
					<div className="loader"></div>
				) : (
					<>
						<CodeEditor
							ref={codeEditorRef}
							value={editorValue}
							onChange={() => {
								onChange(codeEditorRef.current?.value!);
							}}
							language="js"
							style={{
								fontSize: 23,
								fontFamily: "Righteous, cursive",
								overflowY: "scroll",
							}}
						/>
						<button className="rstBtn" onClick={() => onChange(codeBlock?.initialCode!)}>
							<FcRefresh />
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default CodeBlockEditor;
