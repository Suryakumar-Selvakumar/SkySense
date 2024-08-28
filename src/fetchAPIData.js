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
    return [
      weatherData.currentConditions,
      weatherData.days,
      weatherData.description,
      weatherData.resolvedAddress,
    ];
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
