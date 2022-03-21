import React from "react";
import ForecastDay from "./forecastDay";

function ForecastWeather({ forecast, type }) {
	return (
		<div className="container grid grid-cols-2 grid-cols-3">
			{forecast.forecastday.map((day) => (
				<ForecastDay key={day.date} forecastday={day} type={type} />
			))}
		</div>
	);
}

export default ForecastWeather;
