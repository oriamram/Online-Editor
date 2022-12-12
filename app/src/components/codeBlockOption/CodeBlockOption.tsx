import React from "react";
import { NavLink } from "react-router-dom";
import "./styles/codeBlockOption.scss";

interface codeBlockOptionProps {
	title: string;
}

const CodeBlockOption = ({ title }: codeBlockOptionProps) => {
	return (
		<NavLink to={`/${title}`} className="CodeBlockOption">
			{title.replaceAll("_", " ")}
		</NavLink>
	);
};

export default CodeBlockOption;
