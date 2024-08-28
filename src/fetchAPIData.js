// const location = document.getElementById("location");

async function fetchData(location) {
  let baseUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  const url =
    baseUrl +
    `${location}?unitGroup=us&key=GW86HSGEHF5AVYES3FFP4YW5N&contentType=json`;
  const response = await fetch(url, { mode: "cors" });
  const weatherData = await response.json();
  //   && imgData.data.images
  if (weatherData) {
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
      })
    return {
      currentConditions: {
        conditions: weatherData.currentConditions.conditions,
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

async function callFetchData(location) {
  try {
    const response = await fetchData(location);
    return response;
  } catch (error) {
    console.error(error);
    // Set a default location that will be displayed if the entered location couldn't be fetched
    return "Location not found, please try again.";
  }
}

export { callFetchData };
