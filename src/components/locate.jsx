import React from "react";
import Icon from "./icon";

function Locate(props) {
	return (
		<div className="container">
			<button onClick={props.onClick} className="btn btn--light-black">
				<Icon name="location" color="white" size={20} />
				Locate Me
			</button>
		</div>
	);
}

export default Locate;
