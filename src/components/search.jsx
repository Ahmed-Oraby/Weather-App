import React, { Component } from "react";
import Icon from "./icon";
import NotFound from "./notFound";

class Search extends Component {
	state = {
		value: "",
	};

	handleChange = (e) => {
		this.setState({ value: e.target.value });
	};

	render() {
		return (
			<div className="container">
				<form
					className="search-form"
					onSubmit={(e) => this.props.onSubmit(this.state.value, e)}
				>
					<label className="search-label" htmlFor="search">
						Search Location:{" "}
					</label>
					<div className="search-group">
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
					</div>
				</form>
				{this.props.notFound && (
					<NotFound message="🙁 Not Found. Please enter a valid name!" />
				)}
			</div>
		);
	}
}

export default Search;
