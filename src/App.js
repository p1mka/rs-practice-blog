import logo from "./logo.svg";
import "./App.css";
import { createElement } from "react";

export const App = () => {
	//Императивный
	const currentDate = new Date();
	const currentYear = currentDate.getFullYear();
	return createElement(
		"div",
		{
			className: "App",
		},
		createElement(
			"header",
			{
				className: "App-header",
			},
			createElement("img", {
				src: logo,
				className: "App-logo",
				alt: "logo",
			}),
			createElement(
				"p",
				null,
				"Edit ",
				createElement("code", null, "src/App.js"),
				" and save to reload ."
			),
			createElement(
				"a",
				{
					className: "App-link",
					href: "https://reactjs.org",
					target: "_blank",
					rel: "noopener noreferrer",
				},
				"Learn React"
			),
			createElement("h1", null, currentYear)
		)
	);
};
