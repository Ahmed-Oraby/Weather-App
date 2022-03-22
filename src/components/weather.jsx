import React, { Component } from "react";
import CurrentWeather from "./currentWeather";
import Search from "./search";
import Loading from "./loading";
import Locate from "./locate";
import ForecastWeather from "./forecastWeather";
import NotFound from "./notFound";

class Weather extends Component {
	state = {
		weatherLoaded: false,
		current: null,
		location: null,
		forecast: null,
		type: "C",
		errorMessage: "",
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
		name: "",
		searched: false,
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
				this.setState({ weatherLoaded: false, errorMessage: "" });
				this.getWeatherData("forecast", null, locationName.toLowerCase());
			} else {
				let weatherData = {
					current: this.searchedWeather.current,
					location: this.searchedWeather.location,
					forecast: this.searchedWeather.forecast,
				};
				this.setWeatherData(weatherData);
			}
		}
	};

	handleLocate = () => {
		if (!this.locatedWeather.current) {
			this.getCurrentWeather("forecast");
		} else {
			let weatherData = {
				current: this.locatedWeather.current,
				location: this.locatedWeather.location,
				forecast: this.locatedWeather.forecast,
			};
			this.setWeatherData(weatherData);
		}
	};

	render() {
		return (
			<React.Fragment>
				<Search onSubmit={this.handleSearch} />
				<Locate onClick={this.handleLocate} />
				{this.state.weatherLoaded ? (
					<>
						<CurrentWeather
							current={this.state.current}
							location={this.state.location}
							type={this.state.type}
							onTemperatureChange={this.handleTemperatureChange}
						/>
						<ForecastWeather forecast={this.state.forecast} type={this.state.type} />
					</>
				) : (
					//render a loading spinner when an api request is sent by either locating or searching,
					//but the spinner doesn't load at app start
					(this.locatedWeather.located || this.searchedWeather.searched) && <Loading />
				)}
				{this.state.errorMessage && <NotFound message={this.state.errorMessage} />}
			</React.Fragment>
		);
	}

	getCurrentWeather(type) {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log(position);
					this.locatedWeather.located = true;
					this.setState({ weatherLoaded: false, errorMessage: "" });
					this.getWeatherData(type, position);
				},
				(error) => {
					console.log(error);
					this.locatedWeather.located = false;
					this.setState({
						weatherLoaded: false,
						errorMessage: "🙁 Error. Location cannot be detected!",
					});
				}
			);
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

		xhr.onload = () => {
			if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
				data = JSON.parse(xhr.responseText);
				console.log("weather:", data);
				this.setWeatherData(data);
			} else if (xhr.status === 400) {
				this.searchedWeather.name = "";
				this.searchedWeather.searched = false;
				this.setState({
					weatherLoaded: false,
					errorMessage: "🙁 Not Found. Please enter a valid name!",
				});
			}
		};
		xhr.open("GET", requestURL, true);
		xhr.send();
	}

	setWeatherData(weatherData) {
		if (this.locatedWeather.located) {
			//set located flag to false to reduce server requests for the same location
			this.locatedWeather = { located: false, ...weatherData };
		} else if (this.searchedWeather.searched) {
			let name = this.searchedWeather.name;
			//set searched flag to false to reduce server requests for the last searched location
			this.searchedWeather = { searched: false, name, ...weatherData };
		}
		this.setState({
			weatherLoaded: true,
			errorMessage: "",
			...weatherData,
		});
	}
}

export default Weather;
