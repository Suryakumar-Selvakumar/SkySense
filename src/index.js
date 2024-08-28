import { fetchData } from "./fetchAPIData.js";
import { displayCurrentWeather } from "./displayCurrentWeather.js";
import "./style.css";

const mainContent = document.querySelector(".main-content");
const locationForm = document.querySelector(".location-form");

async function getWeatherData(location) {
  try {
    const weatherData = await fetchData(location);
    console.log(weatherData);
    displayCurrentWeather(weatherData);
  } catch (error) {
    console.error(error);
    // Set the text of the div to "location not found" if location couldn't be found.
    console.log("Location not found, please try again.");
  }
}

//Event listener to display the enter location form
const displayFormBtn = document.querySelector("#display-form");
displayFormBtn.addEventListener("click", () => {
  locationForm.style.cssText = "visibility: visible;";
  displayFormBtn.style.cssText = "display: none;";
});

// Event listener to submit enter location form and get its formdata
locationForm.addEventListener("submit", (event) => {
  mainContent.innerHTML = "";
  event.preventDefault();
  new FormData(locationForm);
  locationForm.reset();
  locationForm.style.cssText = "visibility: hidden;";
  displayFormBtn.style.cssText = "display: flex;";
});

// Event listener to use the formData to fetch the weather data
locationForm.addEventListener("formdata", (e) => {
  const data = e.formData;
  const dataArray = [];
  let locationValue;
  for (const value of data.values()) {
    dataArray.push(value);
  }

  locationValue = dataArray[0];

  getWeatherData(locationValue);
});
