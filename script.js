class WeatherData
{
	constructor()
	{
		this.data = this.getWeatherData("Belgorod", "f77437bf548a93cddf46a0c9645f9aa2");
	}

	getWeatherData = (cityName, apiKey) =>
	{
		let xhr = new XMLHttpRequest();
		xhr.open("GET", `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`, false);
		xhr.send();

		return xhr.response;
	}

	getDataAsObject()
	{
		return JSON.parse(this.data);
	}
}

let weatherData = new WeatherData();
let resultContainer = document.getElementById("container");

let renderTodayWeather = (data) =>
{
	let dCurrentWeather = `<div>
        <div class="row">
            <div class="col"><span>Current Weather</span></div>
            <div class="col"><span id="current-day"></span></div>
        </div>
        <div class="row">
            <div id="current-weather-image" class="col"></div>
            <div id="current-weather-temp" class="col"></div>
            <div id="current-weather-sunrise" class="col"></div>
        </div>
    </div> `;

	resultContainer.innerHTML += dCurrentWeather;

	// Заполняем данными
	//__________________________________________________DATE_____________________________________________
	let currentData = new Date();
	let currentMonth = Number(currentData.getMonth()) + 1;

	if (currentMonth % 10 > 0)
	{
		currentMonth = `0${currentMonth}`;
	}

	document.getElementById("current-day").innerText = `${currentData.getDate()}.` +
		`${currentMonth}.${currentData.getFullYear()}`;

	//__________________________________________________ICON_____________________________________________
	document.getElementById("current-weather-image").innerHTML = `<img src="./icons/${data.weather[0].icon}.png" class="img-thumbnail" alt="Иконка не найдена"></img>`;

	//_____________________________________________TEXT_AFTER_ICON_______________________________________

	document.getElementById("current-weather-image").innerHTML + `<p>${}<p>`
	//__________________________________________________TEMP_____________________________________________
	document.getElementById("current-weather-temp").innerHTML = `<span>` +
		Math.floor(data.main.temp) +
		`&#176;C</span>`;


	//_________________________________________________SUNRISE___________________________________________
	const dateSunr = new Date(data.sys.sunrise * 1000);
	const dateSuns = new Date(data.sys.sunset * 1000);
	const duration = new Date((data.sys.sunrise - data.sys.sunset) * 1000);

	document.getElementById("current-weather-sunrise").innerHTML = `<p class="text-center">Sunrise: ${dateSunr.getHours()}:${dateSunr.getMinutes()} </p>` +
		`<p class="text-center">Sunset: ${dateSuns.getHours()}:${dateSuns.getMinutes()} </p>` +
		`<p class="text-center">Duration: ${duration.getHours()}:${duration.getMinutes()}</p>`;

}

let bRenderTodayWeather = document.getElementById("btn-check-outlined");
bRenderTodayWeather.addEventListener('click', () => { renderTodayWeather(weatherData.getDataAsObject()) });

let bRenderFiveDeyWeather = document.getElementById("btn-check-2-outlined");
bRenderFiveDeyWeather.addEventListener('click', () =>
{
	alert(2);
});

// По нажатию на кнопку поиск:
// 1) Идёт получение данных (на день/5 дней)
// 2) Отрисовка граф. элементов вместе с их заполнением данными