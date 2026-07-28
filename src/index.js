function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let speedElement = document.querySelector("#speed");
    let humidityElement = document.querySelector("#humidity");
    let currentDateElement = document.querySelector("#current-date");
    let currentDate = new Date();
    
    
    
    
    cityElement.innerHTML = response.data.city;
    
    
    
    currentDateElement.innerHTML = formatDate(currentDate);
    humidityElement.innerHTML = response.data.temperature.humidity;
    speedElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(temperature);



    displayWeather(response);
}


function formatForecastDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[date.getDay()];
}

function displayForecast(response) {
    let forecastElement = document.querySelector("#forecast");
    let forecastHtml = "";

    let localIconMap = {
        "clear-sky-day": "icons/sunny.gif",
        "clear-sky-night": "icons/night.gif",
        "few-clouds-day": "icons/cloudy.gif",
        "few-clouds-night": "icons/cloudy night.gif",
        "scattered-clouds-day": "icons/cloudy.gif",
        "scattered-clouds-night": "icons/cloudy night.gif",
        "broken-clouds-day": "icons/cloudy.gif",
        "broken-clouds-night": "icons/cloudy night.gif",
        "shower-rain-day": "icons/rainy.gif",
        "shower-rain-night": "icons/rainy.gif",
        "rain-day": "icons/rainy.gif",
        "rain-night": "icons/rainy.gif",
        "thunderstorm-day": "icons/thundering.gif",
        "thunderstorm-night": "icons/thundering.gif",
        "snow-day": "icons/snowing.gif",
        "snow-night": "icons/snowing.gif",
        "mist-day": "icons/rainy.gif",
        "mist-night": "icons/rainy.gif"
    };

    response.data.daily.forEach(function (day, index) {
        if (index < 5) {

            let apiIconCode = day.condition.icon;

            let customIconPath = localIconMap[apiIconCode] || "icons/sunny.gif";

            forecastHtml += `
                <div class="weather-forecast-day">
                    <div class="weather-forecast-date">${formatForecastDay(day.time)}</div>
                    <img src="${customIconPath}" class="weather-forecast-icon" alt="${day.condition.description}"/>
                    <div class="weather-forecast-temperatures">
                        <span class="weather-forecast-temp-max">
                            ${Math.round(day.temperature.maximum)}°
                        </span>
                        <span class="weather-forecast-temp-min">
                            ${Math.round(day.temperature.minimum)}°
                        </span>
                    </div>
                </div>
            `;
        }
    });

    forecastElement.innerHTML = forecastHtml;
}


function getCityTime(timezoneName) {
  return new Intl.DateTimeFormat('en-US', {
    timeStyle: 'medium',
    timeZone: timezoneName
  }).format(new Date());
}

function displayWeather(response) {
    let apiIconCode = response.data.condition.icon;
    let iconElement = document.querySelector("#icon");

    let bodyElement = document.querySelector("#weather-app");

    let localIconMap = {
        "clear-sky-day": "icons/sunny.gif",
        "clear-sky-night": "icons/night.gif",
        "few-clouds-day": "icons/cloudy.gif",
        "few-clouds-night": "icons/cloudy night.gif",
        "scattered-clouds-day": "icons/cloudy.gif",
        "scattered-clouds-night": "icons/cloudy night.gif",
        "broken-clouds-day": "icons/cloudy.gif",
        "broken-clouds-night": "icons/cloudy night.gif",
        "shower-rain-day": "icons/rainy.gif",
        "shower-rain-night": "icons/rainy.gif",
        "rain-day": "icons/rainy.gif",
        "rain-night": "icons/rainy.gif",
        "thunderstorm-day": "icons/thundering.gif",
        "thunderstorm-night": "icons/thundering.gif",
        "snow-day": "icons/snowing.gif",
        "snow-night": "icons/snowing.gif",
        "mist-day": "icons/rainy.gif",
        "mist-night": "icons/rainy.gif"
    };


    let localBackgroundMap = {
    "clear-sky-day": "Background/Sunny.gif",
    "clear-sky-night": "Background/clear night.gif",
    "few-clouds-day": "Background/Cloudy.gif",
    "few-clouds-night": "Background/Cloudy.gif",
    "scattered-clouds-day": "Background/Cloudy.gif",
    "scattered-clouds-night": "Background/Cloudy.gif",
    "broken-clouds-day": "Background/Cloudy.gif",
    "broken-clouds-night": "Background/Cloudy.gif",
    "shower-rain-day": "Background/Rainy.gif",
    "shower-rain-night": "Background/Rainy.gif",
    "rain-day": "Background/Rainy.gif",
    "rain-night": "Background/Rainy.gif",
    "thunderstorm-day": "Background/Thunder.gif",
    "thunderstorm-night": "Background/Thunder.gif",
    "snow-day": "Background/Snowy.gif",
    "snow-night": "Background/Snowy.gif",
    "mist-day": "Background/Rainy.gif",
    "mist-night": "Background/Rainy.gif"
  };


    let customIconPath = localIconMap[apiIconCode] || "icons/sunny.gif";
    
    let customBgPath = localBackgroundMap[apiIconCode] || "Background/Sunny.gif";

    iconElement.setAttribute("src", customIconPath);

    iconElement.setAttribute("alt", response.data.condition.description);

    if (bodyElement) {
        bodyElement.style.backgroundImage = `url('${customBgPath}')`;
    }
}


function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let day = date.getDay();

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    if (hours < 10) {
        hours = `0${hours}`;
    }

let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

let formattedDay = days[day];
return `${formattedDay} ${hours}:${minutes}`;

}





function searchCity(city) {
    let apiKey = "4o0f0d00b99adfd3cfc2458ct6974d63";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(refreshWeather);
    
    let forecastApiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=imperial`;
    axios.get(forecastApiUrl).then(displayForecast);
}



function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
    
    searchCity(searchInput.value);
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Fontana");
