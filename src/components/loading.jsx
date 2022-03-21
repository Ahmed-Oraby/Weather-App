import React from "react";
import spinner from "../images/spinner.gif";

function Loading() {
	return (
		<div className="container">
			<img className="spinner" src={spinner} alt="" />
		</div>
	);
}

export default Loading;
