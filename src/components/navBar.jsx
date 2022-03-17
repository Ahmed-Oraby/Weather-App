import React, { Component } from "react";
import LocalTime from "./localTime";

class NavBar extends Component {
	state = {};
	render() {
		return (
			<nav className="nav-bar">
				<h1 className="nav__title">Weather App</h1>
				<LocalTime />
			</nav>
		);
	}
}

export default NavBar;
