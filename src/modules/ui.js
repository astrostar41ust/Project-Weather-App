import getWeather from "./api";

const displayController = (() => {
  let weatherCard = document.querySelector(".weather-card");
  let errorContainer = document.querySelector(".error-container");
  let locationSearchInput = document.querySelector("#location-search");
  let searchBtn = document.querySelector("#search-btn");

  let locationText = document.querySelector(".location");
  let timezoneText = document.querySelector(".timezone");
  let temperatureText = document.querySelector(".temperature");
  let feelslikeText = document.querySelector(".feels-like");
  let conditionsText = document.querySelector(".conditions");
  let humidityText = document.querySelector(".humidity");
  let datetimeText = document.querySelector(".datetime");
  let descriptionText = document.querySelector(".description");

  const displplayWeather = (dataArray) => {
    if (dataArray.isFallback) {
      weatherCard.className = "hide";
      errorContainer.className = "error-container";

      return false;
    }

    let {
      location,
      description,
      timezone,
      conditions,
      datetime,
      temperature,
      humidity,
      feelslike,
    } = dataArray;
    locationText.textContent = location;
    timezoneText.textContent = timezone;
    descriptionText.textContent = description;
    conditionsText.textContent = conditions;
    datetimeText.textContent = datetime;
    temperatureText.textContent = temperature + "°F";
    humidityText.textContent = humidity;
    feelslikeText.textContent = feelslike + "°F";

    weatherCard.className = "weather-card";
    errorContainer.className = "error-container hide";
   
  };

 

  const init = () => {
    searchBtn.addEventListener("click", async () => {
      let dataArray = await getWeather.getProcessedWeatherData(
        locationSearchInput.value
      );

      displplayWeather(dataArray);
    });
  };

  return { init };
})();

export default displayController;
