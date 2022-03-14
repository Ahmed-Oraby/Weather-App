import React from "react";
import Icon from "./icon";

function WeatherCelsius({ current }) {
	return (
		<div className="container__background weather__data">
			<p>
				<Icon name="temperature" color="white" size="35" />
				Feels Like: {current.feelslike_c}&deg;&nbsp;C
			</p>
			<p>
				<Icon name="wind" color="white" size="35" />
				Wind: {current.wind_kph} kph
			</p>
			<p>
				<Icon name="visible" color="white" size="35" />
				Visibilty: {current.vis_km} km
			</p>
			<p>
				<Icon name="barometer" color="white" size="35" />
				Barometer: {current.pressure_mb} mb
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

export default WeatherCelsius;
