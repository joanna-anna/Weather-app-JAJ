// Get date and time
function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minuts = date.getMinutes();
  if (minuts < 10) {
    minuts = `0${minuts}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minuts}`;
}

//Weekly forecast days
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

///Weekly forecast
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `  
       
          <div class=" card-group g-3 card-background" style="width: 6rem;" >
              <div class="col-sm-3 card cardA " >
                  <div class="weather-forcast-date">${formatDay(
                    forecastDay.time
                  )}</div>
               
                  <img
                   src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                     forecastDay.condition.icon
                   }.png"
                   alt=""
                   width="56"
                   />
                   <div class="weather-forcast-temperature">
                   <span class="weather-forcast-temperature-max"> ${Math.round(
                     forecastDay.temperature.maximum
                   )}°</span>
                   <span class="weather-forcast-temperature-min"> ${Math.round(
                     forecastDay.temperature.minimum
                   )}°</span>
                  </div>
              </div>
          </div>
        
           `;
    }
  });

  forecastHTML = forecastHTML + `</div> `;
  forecastElement.innerHTML = forecastHTML;
}

function getForcast(coordinates) {
  let apiKey = "d0fo1c2387c00a7200tda8b3e35c0794";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

//Get location and weather conditions
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let descriptionElement = document.querySelector("#description");
  let realfeelElement = document.querySelector("#real-feel");
  let iconElement = document.querySelector("#icon");
  celsiusTemperature = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  realfeelElement.innerHTML = Math.round(response.data.temperature.feels_like);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.description);
  getForcast(response.data.coordinates);
}

//Get city
function searchCity(city) {
  let apiKey = "d0fo1c2387c00a7200tda8b3e35c0794";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

//search  for city
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  searchCity(cityInputElement.value);
}

function searchLocation(position) {
  let apiKey = "d0fo1c2387c00a7200tda8b3e35c0794";
  let apiPositionUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiPositionUrl).then(displayTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//get temperature in Celsius and in Fahrenheit
function displayFahrenheitTemperatur(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperatur(event) {
  event.preventDefault();

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperatur);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperatur);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Görlitz");
