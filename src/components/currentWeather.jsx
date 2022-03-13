import React, { Component } from "react";
import icons from "../images/icons.svg";

function getSVGIcon(iconName) {
	return (
		<svg class="icon">
			<use xlinkHref={`${icons}#${iconName}`}></use>
		</svg>
	);
}

function CurrentWeather(props) {
	console.log(props);
	const { location, current } = props;
	return (
		<div className="container grid grid-cols-2">
			<div className="container__background weather">
				<h1 className="weather__location">
					{getSVGIcon("location")}
					{`${location.name},`}
					<br />
					{`${location.region}, ${location.country}`}
				</h1>
				<div className="flex flex-centered">
					<img className="weather__icon" src={current.condition.icon} alt="" />
					<p className="weather__temp">{current.temp_c}&deg;&nbsp;C</p>
				</div>
				<p className="weather__condition">{current.condition.text}</p>
				<p className="weather__updated">Updated as of {current.last_updated}</p>
			</div>
			<div>
				<div className="container__background weather__data">
					<p>
						{getSVGIcon("temperature")}
						Feels Like: {current.feelslike_c}&deg;&nbsp;C
					</p>
					<p>
						{getSVGIcon("wind")}
						Wind: {current.wind_kph} km/h
					</p>
					<p>
						{getSVGIcon("visible")}
						Visibilty: {current.vis_km} km
					</p>
					<p>
						{getSVGIcon("barometer")}
						Barometer: {current.pressure_mb} mb
					</p>
					<p>
						{getSVGIcon("humidity")}
						Humidity: {current.humidity} %
					</p>
					<p>
						{getSVGIcon("uv-rays-of-sun")}
						UV Index: {current.uv}
					</p>
				</div>
			</div>
		</div>
	);
}

export default CurrentWeather;
