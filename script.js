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

    document.body.innerHTML += dCurrentWeather;

    // Заполняем данными
    //__________________________________________________DATE_____________________________________________
    let currentData = new Date();
    let currentMonth = Number(currentData.getMonth()) + 1;

    if (currentMonth % 10 > 0)
    {
        currentMonth = `0${currentMonth}`;
    }

    document.getElementById("current-day").innerText = `${currentData.getDay()}.` +
        `${currentMonth}.${currentData.getFullYear()}`;

    //__________________________________________________ICON_____________________________________________

    //__________________________________________________TEMP_____________________________________________
    document.getElementById("current-weather-temp").innerHTML = `<span>` +
        Math.floor(data.main.temp) +
        `&#176;C</span>`;
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