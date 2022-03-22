import React, { Component } from "react";

let intervalID;

class LocalTime extends Component {
	state = {
		date: new Date(),
	};

	componentDidMount() {
		intervalID = setInterval(() => {
			this.setState({ date: new Date() });
		}, 100);
	}

	componentWillUnmount() {
		clearInterval(intervalID);
	}

	render() {
		return (
			<div>
				<p>
					{this.state.date.toLocaleDateString()}, {this.state.date.toLocaleTimeString()}
				</p>
			</div>
		);
	}
}

export default LocalTime;
