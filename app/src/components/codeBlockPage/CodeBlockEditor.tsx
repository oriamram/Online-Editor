import { useEffect, useState, useContext, useRef } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import axios from "axios";
import { socketContext } from "../App";
import { FcRefresh } from "react-icons/fc";
import { AiOutlineSmile, AiOutlineQuestionCircle } from "react-icons/ai";
import "./styles/codeBlockEditor.scss";

interface codeBlockType {
	title: string;
	initialCode: string;
	changedCode: string;
	solutionCode: string;
}

interface codeBlockEditorProps {
	title: string;
}

const CodeBlockEditor = ({ title }: codeBlockEditorProps) => {
	const [codeBlock, setCodeBlock] = useState<codeBlockType>();
	const [editorValue, setEditorValue] = useState<string | undefined>();
	const [correctSolution, setCorrectSolution] = useState<boolean>(false);
	const socket = useContext(socketContext);
	const codeEditorRef = useRef<HTMLTextAreaElement>(null);

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

	//chagne displayed code accordingly to changes other users make
	useEffect(() => {
		getRelevantCodeBlock();
		socket.on("changedCode", (changedCode) => {
			setEditorValue(changedCode);
		});
		return () => {
			socket.off("changedCode");
		};
	}, []);

	useEffect(() => {
		setEditorValue(codeBlock ? codeBlock.changedCode : "!$loadingState");
	}, [codeBlock]);

	//when user changes editors content, send changes to all other users currently in that page
	const onChange = (value: string) => {
		setEditorValue(value);
		socket.emit("changeInEditor", title, value);
	};

	const showSolution = () => {
		setEditorValue(
			editorValue +
				`
//////////////////////////////////////////// to answer correctly remove from here all the way down
${codeBlock?.solutionCode.slice(codeBlock?.solutionCode.indexOf("let") - 1)}`
		);
	};

	//check for currect answer
	useEffect(() => {
		if (editorValue && editorValue === codeBlock?.solutionCode) {
			setCorrectSolution(true);
		}
	});

	return (
		<div className="code">
			<div className="CodeBlockEditor">
				{editorValue === "!$loadingState" ? (
					<div className="loader codeBlockPage"></div>
				) : (
					<>
						{correctSolution ? (
							<div className="smiley">
								<AiOutlineSmile />
							</div>
						) : (
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
						)}
						<div className="btns">
							<button
								className="solutionBtn"
								onClick={() => {
									showSolution();
								}}
							>
								<AiOutlineQuestionCircle />
							</button>
							<button
								className="rstBtn"
								onClick={() => {
									setCorrectSolution(false);
									onChange(codeBlock?.initialCode!);
								}}
							>
								<FcRefresh />
							</button>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default CodeBlockEditor;
