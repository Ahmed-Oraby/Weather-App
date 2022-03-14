import React, { Component } from "react";
import Icon from "./icon";

class Search extends Component {
	state = {
		value: "",
	};

	handleChange = (e) => {
		this.setState({ value: e.target.value });
		console.log(e);
	};

	render() {
		return (
			<div className="container">
				<form
					className="search-group"
					onSubmit={(e) => this.props.onSubmit(this.state.value, e)}
				>
					<input
						onChange={this.handleChange}
						className="search"
						type="text"
						name="search"
						id="search"
						value={this.state.value}
					/>
					<button className="btn" type="submit">
						<Icon name="search" color="white" size={35} />
						Search
					</button>
				</form>
			</div>
		);
	}
}

export default Search;
