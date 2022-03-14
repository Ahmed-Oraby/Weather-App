import React from "react";
import Icon from "./icon";

function WeatherFahrenheit({ current }) {
	return (
		<div className="container__background weather__data">
			<p>
				<Icon name="temperature" color="white" size="35" />
				Feels Like: {current.feelslike_f}&deg;&nbsp;F
			</p>
			<p>
				<Icon name="wind" color="white" size="35" />
				Wind: {current.wind_mph} mph
			</p>
			<p>
				<Icon name="visible" color="white" size="35" />
				Visibilty: {current.vis_miles} mil
			</p>
			<p>
				<Icon name="barometer" color="white" size="35" />
				Barometer: {current.pressure_in} in
			</p>
			<p>
				<Icon name="humidity" color="white" size="35" />
				Humidity: {current.humidity} %
			</p>
			<p>
				<Icon name="uv-index" color="white" size="35" />
				UV Index: {current.uv}
			</p>
		</div>
	);
}

export default WeatherFahrenheit;
