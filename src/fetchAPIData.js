// const location = document.getElementById("location");

async function fetchData(location) {
  let baseUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  const url =
    baseUrl +
    `${location}?iconSet=icons2&unitGroup=us&key=GW86HSGEHF5AVYES3FFP4YW5N&contentType=json`;
  const response = await fetch(url, { mode: "cors" });
  const weatherData = await response.json();
  //   && imgData.data.images
  if (weatherData && response.status !== 400) {
    weatherData.days.forEach((dateObj) => {
      const validKeys = [
        "conditions",
        "datetime",
        "description",
        "humidity",
        "temp",
        "tempmax",
        "tempmin",
      ];
      Object.keys(dateObj).forEach((key) => {
        if (!validKeys.includes(key)) {
          delete dateObj[key];
        }
      });
    });
    return {
      currentConditions: {
        icon: weatherData.currentConditions.icon,
        datetime: weatherData.currentConditions.datetime,
        feelslike: weatherData.currentConditions.feelslike,
        humidity: weatherData.currentConditions.humidity,
        temp: weatherData.currentConditions.temp,
      },
      days: weatherData.days,
      description: weatherData.description,
      resolvedAddress: weatherData.resolvedAddress,
    };
  } else {
    throw new Error("No Location found for the search query.");
  }
}

export { fetchData };