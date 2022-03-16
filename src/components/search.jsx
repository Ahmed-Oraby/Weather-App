import React, { Component } from "react";
import Icon from "./icon";
import NotFound from "./notFound";

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
					<button className="btn btn--secondary" type="submit">
						<Icon name="search" color="white" size={20} />
						Search
					</button>
				</form>
				{this.props.notFound && (
					<NotFound message="🙁 Not Found. Please enter a valid name!" />
				)}
			</div>
		);
	}
}

export default Search;
