const getWeather = (() => {
  const fetchWeather = async (location) => {
    try {
      let url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=QK8DTYJ9CLLKP6NLZKH2NC25Y`;
      let response = await fetch(url);

      let data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching or parsing weather data:", error);
      return { error: true, message: "Failed to load weather data." };
    }
  };

  const processWeatherData = (data) => {
    return {
      location: data.resolvedAddress,
      description: data.description,
      timezone: data.timezone,
      conditions: data.currentConditions.conditions,
      datetime: data.currentConditions.datetime,
      temperature: data.currentConditions.temp,
      humidity: data.currentConditions.humidity,
      feelslike: data.currentConditions.feelslike,
    };
  };

  const getProcessedWeatherData = async (location) => {
    let data = await fetchWeather(location);

    if (data && data.error) {
      return {
        location: "N/A",
        description: "Weather data unavailable",
        timezone: "N/A",
        conditions: "N/A",
        datetime: "N/A",
        icon: "unknown",
        humidity: "N/A",
        feelslike: "N/A",
        isFallback: true,
      };
    }
    
    let processData = processWeatherData(data);

    return processData;
  };

  return { fetchWeather, getProcessedWeatherData };
})();

// key QK8DTYJ9CLLKP6NLZKH2NC25Y

// // let data =  getWeather.getProcessedWeatherData(url)

// console.log(data)

export default getWeather;
