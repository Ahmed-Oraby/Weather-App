import React, { Component } from "react";
import CurrentWeather from "./currentWeather";
import Search from "./search";
import Loading from "./loading";

// const APIURL = "https://api.weatherapi.com/v1/";
// const APIKey = "969cb668e64d4173bc0145329222001";

class Weather extends Component {
	state = {
		weatherLoaded: false,
		current: null,
		location: null,
		type: "C",
	};

	API = {
		URL: "https://api.weatherapi.com/v1/",
		key: "969cb668e64d4173bc0145329222001",
	};

	handleTemperatureChange = (type) => {
		if (type === this.state.type) return;
		this.setState({ type });
	};

	handleSubmit = (value, e) => {
		e.preventDefault();
		if (value) {
			this.getWeatherData("current", null, value.toLowerCase());
		}
	};

	componentDidMount() {
		this.getCurrentWeather("forecast");
		console.log("mounted");
	}

	render() {
		return this.state.weatherLoaded ? (
			<React.Fragment>
				<Search onSubmit={this.handleSubmit} />
				<CurrentWeather
					current={this.state.current}
					location={this.state.location}
					type={this.state.type}
					onTemperatureChange={this.handleTemperatureChange}
				/>
			</React.Fragment>
		) : (
			<Loading />
		);
	}

	getCurrentWeather(type) {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				console.log(position);
				this.getWeatherData(type, position);
			});
		} else {
			console.log("your browser doesnot support geoloction");
		}
	}

	getWeatherData(type, position, locationName = "") {
		let requestURL, data;
		let xhr = new XMLHttpRequest();
		if (!locationName && !position) return;
		if (locationName) {
			requestURL = `${this.API.URL + type}.json?key=${
				this.API.key
			}&q=${locationName}&days=3&aqi=no&alerts=no`;
		} else {
			requestURL = `${this.API.URL + type}.json?key=${this.API.key}&q=${
				position.coords.latitude
			},${position.coords.longitude}&days=3&aqi=no&alerts=no`;
		}
		// if ("geolocation" in navigator) {
		// 	navigator.geolocation.getCurrentPosition((position) => {
		// 		console.log(position);

		xhr.onload = () => {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				console.log(xhr);
				data = JSON.parse(xhr.responseText);
				console.log("weather:", data);
				this.setWeatherData(data);
			}
		};
		xhr.open("GET", requestURL, true);
		xhr.send();
		// });
		// } else {
		// 	console.log("your browser doesnot support geoloction");
		// }
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
