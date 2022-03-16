import React from "react";

function NotFound(props) {
	return (
		<div className="container">
			<div className="not-found">{props.message}</div>
		</div>
	);
}

export default NotFound;
