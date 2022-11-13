function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidityy");
  let windElement = document.querySelector("#windd");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

let apiKey = "d0fo1c2387c00a7200tda8b3e35c0794";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Berlin&key=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
