import React from "react";

function ForecastDay({ forecastday, type }) {
	return (
		<div className="container__background forecast">
			<div className="forecast__header">
				<h2>{forecastday.date}</h2>
				<div className="flex flex-centered">
					<p>{forecastday.day.condition.text}</p>
					<img
						style={{ marginLeft: "1rem" }}
						src={forecastday.day.condition.icon}
						alt=""
					/>
				</div>
			</div>
			<ul className="forecast__list">
				<li>Rain: {forecastday.day.daily_chance_of_rain} %</li>
				<li>
					Max Temp. :{" "}
					{type === "C" ? forecastday.day.maxtemp_c : forecastday.day.maxtemp_f}
					&deg;&nbsp;{type}
				</li>
				<li>
					Min Temp. :{" "}
					{type === "C" ? forecastday.day.mintemp_c : forecastday.day.mintemp_f}
					&deg;&nbsp;{type}
				</li>
				<li>Sunrise: {forecastday.astro.sunrise}</li>
				<li>Sunset: {forecastday.astro.sunset}</li>
				<li>Moonrise: {forecastday.astro.moonrise}</li>
				<li>Moonset: {forecastday.astro.moonset}</li>
				<li>Moon Phase: {forecastday.astro.moon_phase}</li>
			</ul>
		</div>
	);
}

export default ForecastDay;
