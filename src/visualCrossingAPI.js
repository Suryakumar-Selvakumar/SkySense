// Function to fetch the weather data of a location using the timeline API
export async function fetchData(location) {
  let baseUrl =
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
  const url =
    baseUrl +
    `${location}?lang=en&iconSet=icons2&unitGroup=us&key=GW86HSGEHF5AVYES3FFP4YW5N&contentType=json`;
  const response = await fetch(url, { mode: "cors" });
  const weatherData = await response.json();
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
        "icon",
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
        humidity: weatherData.currentConditions.humidity,
        temp: weatherData.currentConditions.temp,
        conditions: weatherData.currentConditions.conditions,
      },
      days: weatherData.days,
      description: weatherData.description,
      resolvedAddress: weatherData.resolvedAddress,
      timeZone: weatherData.timezone,
      latitude: weatherData.latitude,
      longitude: weatherData.longitude,
    };
  } else {
    throw new Error("No Location found for the search query.");
  }
}
