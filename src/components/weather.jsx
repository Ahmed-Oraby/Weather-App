import React, { Component } from "react";
import CurrentWeather from "./currentWeather";
import spinner from "../images/spinner.gif";

class Weather extends Component {
	state = {
		weatherLoaded: false,
		current: null,
		location: null,
		type: "C",
	};

	handleTemperatureChange = (type) => {
		if (type === this.state.type) return;
		this.setState({ type });
	};

	componentDidMount() {
		this.getWeatherData("current");
		console.log("mounted");
	}

	render() {
		return this.state.weatherLoaded ? (
			<CurrentWeather
				current={this.state.current}
				location={this.state.location}
				type={this.state.type}
				onTemperatureChange={this.handleTemperatureChange}
			/>
		) : (
			<div className="spinner-container">
				<img className="spinner" src={spinner} alt="" />
			</div>
		);
	}

	getWeatherData(type) {
		let requestURL, data;
		let xhr = new XMLHttpRequest();
		const APIURL = "https://api.weatherapi.com/v1/";
		const APIKey = "969cb668e64d4173bc0145329222001";
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.log(position);
				requestURL = `${APIURL + type}.json?key=${APIKey}&q=${position.coords.latitude},${
					position.coords.longitude
				}&aqi=no`;
				xhr.onload = () => {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						if (xhr.status === 200) {
							data = JSON.parse(xhr.responseText);
							console.log("weather:", data);
							this.setWeatherData(data);
						}
					}
				};
				xhr.open("GET", requestURL, true);
				xhr.send();
			});
		} else {
			console.log("your browser doesnot support geoloction");
		}
	}

	setWeatherData(weatherData) {
		this.setState({
			weatherLoaded: true,
			current: weatherData.current,
			location: weatherData.location,
		});
	}
}

export default Weather;
