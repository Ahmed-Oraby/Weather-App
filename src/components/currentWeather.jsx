import React from "react";
import WeatherCelsius from "./weatherCelsius";
import WeatherFahrenheit from "./weatherFahrenheit";
import Icon from "./icon";

function CurrentWeather(props) {
	const { location, current, type, onTemperatureChange } = props;
	return (
		<div className="container grid grid-cols-2">
			<div className="container__background weather">
				<div className="weather__location">
					<p>
						<Icon name="location" color="white" size="35" />
						{`${location.name}, ${location.region},`}
						<br />
						{`${location.country}`}
					</p>
				</div>
				<div className="flex flex-centered">
					<img className="weather__icon" src={current.condition.icon} alt="" />
					<p className="weather__temp">
						{type === "C" ? current.temp_c : current.temp_f}&deg;&nbsp;{type}
					</p>
				</div>
				<p className="weather__condition">{current.condition.text}</p>
				<p className="weather__updated">
					Updated as of: <br /> {current.last_updated}
				</p>
				<div style={{ textAlign: "center" }}>
					<button className="btn btn--primary" onClick={() => onTemperatureChange("C")}>
						Celsius
					</button>
					<button className="btn btn--primary" onClick={() => onTemperatureChange("F")}>
						Fahrenheit
					</button>
				</div>
			</div>
			{type === "C" ? (
				<WeatherCelsius current={current} />
			) : (
				<WeatherFahrenheit current={current} />
			)}
		</div>
	);
}

export default CurrentWeather;
