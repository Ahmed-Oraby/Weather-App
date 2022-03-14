import React from "react";
import icons from "../images/icons.svg";

function Icon({ name, color, size }) {
	return (
		<svg class="icon" fill={color} width={size} height={size}>
			<use xlinkHref={`${icons}#${name}`}></use>
		</svg>
	);
}

export default Icon;
