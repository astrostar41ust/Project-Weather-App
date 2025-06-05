document.addEventListener("DOMContentLoaded", () => {
  let container = document.querySelector(".container");
  let locationInput = document.querySelector("#location");
  let btn = document.querySelector("#search-btn");
  let locationText = document.querySelector("#location-text");

  btn.addEventListener("click", async () => {
    let data = await getWeather.getProcessedWeatherData(locationInput.value);
    locationText.textContent = data.conditions;
  });
});

const displayController = (() => {

    const displplayWeather = () => {
        
    }
})();

const getWeather = (() => {
  const fetchWeather = async (location) => {
    try {
      let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=QK8DTYJ9CLLKP6NLZKH2NC25Y`;
      let response = await fetch(url);

    
      let data = await response.json();
      return data;
    } catch (error) {
        
      console.error("Error fetching or parsing weather data:", error);
      
    }
  };

  const processWeatherData = (data) => {
    return {
      location: data.resolvedAddress,
      description: data.description,
      timezone: data.timezone,
      conditions: data.currentConditions.conditions,
      datetime: data.currentConditions.datetime,
      icon: data.currentConditions.icon,
      humidity: data.currentConditions.humidity,
      feelslike: data.currentConditions.feelslike,
    };
  };

  const getProcessedWeatherData = async (location) => {
    let data = await fetchWeather(location);
    let processData = processWeatherData(data);

    return processData;
  };

  return { fetchWeather, getProcessedWeatherData };
})();

// key QK8DTYJ9CLLKP6NLZKH2NC25Y

// // let data =  getWeather.getProcessedWeatherData(url)

// console.log(data)
