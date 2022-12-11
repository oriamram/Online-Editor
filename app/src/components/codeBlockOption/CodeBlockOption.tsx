import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/codeBlockOption.scss";

interface codeBlockOptionProps {
	title: string;
}

const CodeBlockOption = ({ title }: codeBlockOptionProps) => {
	const onClick = () => {
		console.log(title);
	};

	return (
		<NavLink to={`/${title}`} className="CodeBlockOption" onClick={onClick}>
			{title.replace("_", " ")}
		</NavLink>
	);
};

export default CodeBlockOption;
