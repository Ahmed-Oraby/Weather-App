import React from "react";
import spinner from "../images/spinner.gif";

function Loading() {
	return (
		<div className="spinner-container">
			<img className="spinner" src={spinner} alt="" />
		</div>
	);
}

export default Loading;
