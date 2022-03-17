import React, { Component } from "react";
import CurrentWeather from "./currentWeather";
import Search from "./search";
import Loading from "./loading";
import Locate from "./locate";

class Weather extends Component {
	state = {
		weatherLoaded: false,
		current: null,
		location: null,
		forecast: null,
		type: "C",
		notFound: false,
	};

	API = {
		URL: "https://api.weatherapi.com/v1/",
		key: "969cb668e64d4173bc0145329222001",
	};

	locatedWeather = {
		located: false,
		current: null,
		location: null,
		forecast: null,
	};

	searchedWeather = {
		searched: false,
		name: undefined,
		current: null,
		location: null,
		forecast: null,
	};

	handleTemperatureChange = (type) => {
		if (type === this.state.type) return;
		this.setState({ type });
	};

	handleSearch = (locationName, e) => {
		e.preventDefault();
		if (locationName) {
			if (this.searchedWeather.name !== locationName) {
				this.searchedWeather.name = locationName;
				this.searchedWeather.searched = true;
				this.setState({ weatherLoaded: false });
				this.getWeatherData("current", null, locationName.toLowerCase());
			} else {
				this.setWeatherData(this.searchedWeather);
			}
		}
	};

	handleLocate = () => {
		if (!this.locatedWeather.current) {
			this.locatedWeather.located = true;
			this.setState({ weatherLoaded: false });
			this.getCurrentWeather("forecast");
		} else {
			this.setWeatherData(this.locatedWeather);
		}
	};

	// componentDidMount() {
	// 	// this.getCurrentWeather("forecast");
	// 	console.log("mounted");
	// }

	render() {
		return (
			<React.Fragment>
				<Search onSubmit={this.handleSearch} notFound={this.state.notFound} />
				<Locate onClick={this.handleLocate} />
				{this.state.weatherLoaded ? (
					<CurrentWeather
						current={this.state.current}
						location={this.state.location}
						type={this.state.type}
						onTemperatureChange={this.handleTemperatureChange}
					/>
				) : (
					//render a loading spinner when an api request is sent by either locating or searching,
					//but the spinner doesn't load at app start
					(this.locatedWeather.located || this.searchedWeather.searched) && <Loading />
				)}
			</React.Fragment>
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
			console.log(xhr);
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				data = JSON.parse(xhr.responseText);
				console.log("weather:", data);
				this.setWeatherData(data);
			} else if (xhr.status === 400) {
				this.setState({ notFound: true });
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
		if (this.locatedWeather.located) {
			//set located flag to false to reduce server requests for the same location
			this.locatedWeather = { located: false, ...weatherData };
		} else if (this.searchedWeather.searched) {
			let name = this.searchedWeather.name;
			//set searched flag to false to reduce server requests for the last searched location
			this.searchedWeather = { searched: false, name, ...weatherData };
			console.log(this.searchedWeather);
		}
		this.setState({
			weatherLoaded: true,
			current: weatherData.current,
			location: weatherData.location,
			notFound: false,
		});
	}
}

export default Weather;
