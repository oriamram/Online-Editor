import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { socketContext } from "../App";
import CodeBlockEditor from "./CodeBlockEditor";
import CodeBlockMentor from "./CodeBlockMentor";
import "./styles/codeBlockPage.scss";

const CodeBlockPage = () => {
	const { title } = useParams<string>();
	const socket = useContext(socketContext);
	const [spectators, setSpectators] = useState<number>(0);
	const [isFirst, setIsFirst] = useState(false);

	//get spectators count and tell server current page
	useEffect(() => {
		socket.emit("connectedToCodeBlockPage", title);
		socket.on("spectatorsCount", (spectatorsCount) => {
			setSpectators(spectatorsCount);
			if (spectatorsCount < 2) {
				setIsFirst(true);
			}
		});
		localStorage.setItem("lastCodeBlock", title!);
		alert(`Rules are:
- Tab equal 4 spaces.
- The code must be same as the solution code for you to answer currectly (be aware to invisible spaces).
** You can see the solution code and reset the code anytime .
`);
	}, []);

	return (
		<div className="CodeBlockPage">
			<h1 className="title">{title?.replaceAll("_", " ")}</h1>
			{!isFirst ? <CodeBlockEditor title={title!} /> : <CodeBlockMentor title={title!} />}
			<h1 className="spectators">Spectators: {spectators}</h1>
		</div>
	);
};

export default CodeBlockPage;
