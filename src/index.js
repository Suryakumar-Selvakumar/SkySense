import { fetchData } from "./visualCrossingAPI.js";
import { displayWeather } from "./displayWeather.js";
import { getAddress } from "./geoapifyAPI.js";
import "./style.css";

const mainContent = document.querySelector(".main-content");
const locationForm = document.querySelector(".location-form");

let outerWeatherData;
async function getWeatherData(location) {
  try {
    const weatherData = await fetchData(location);
    // console.log(weatherData);
    outerWeatherData = weatherData;
    displayWeather(weatherData, "current", weatherData.days[0].datetime, "fahrenheit");
  } catch (error) {
    console.error(error);
    // Set the text of the div to "location not found" if location couldn't be found.
    mainContent.innerHTML = "";
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error-div");
    errorDiv.textContent = "Location not found, please try again";
    mainContent.appendChild(errorDiv);
  }
}

// Event listener to display the weather details of the user's location on page load
document.addEventListener("DOMContentLoaded", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const loadingDiv = document.createElement("div");
    loadingDiv.classList.add("loading-div");
    loadingDiv.textContent = "Loading...";
    mainContent.appendChild(loadingDiv);
    getAddress(latitude, longitude).then((address) => {
      getWeatherData(address);
    });
  });
});

//Event listener to display the enter location form
const displayFormBtn = document.querySelector("#display-form");
displayFormBtn.addEventListener("click", () => {
  locationForm.style.cssText = "visibility: visible;";
  displayFormBtn.style.cssText = "display: none;";
});

// Event listener to submit enter location form and get its formdata
locationForm.addEventListener("submit", (event) => {
  mainContent.innerHTML = "";
  // Set the text of the div to "Loading.." while the data is being fetched.
  const loadingDiv = document.createElement("div");
  loadingDiv.classList.add("loading-div");
  loadingDiv.textContent = "Loading...";
  mainContent.appendChild(loadingDiv);
  event.preventDefault();
  new FormData(locationForm);
  locationForm.reset();
  locationForm.style.cssText = "visibility: hidden;";
  displayFormBtn.style.cssText = "display: flex;";
});

// Event listener to use the formData to fetch the weather data
let locationValue;
locationForm.addEventListener("formdata", (e) => {
  const data = e.formData;
  const dataArray = [];

  for (const value of data.values()) {
    dataArray.push(value);
  }

  locationValue = dataArray[0];

  getWeatherData(locationValue);
});

// Event listener to display the weather details of the other days in the week
mainContent.addEventListener("click", (event) => {
  if (
    event.target.classList.contains("day") ||
    event.target.classList.contains("day-para") ||
    event.target.classList.contains("day-icon") ||
    event.target.classList.contains("day-temp-max-min")
  ) {
    const dataDate = event.target.getAttribute("data-date");
    const dataIndex = event.target.getAttribute("data-index");
    if (dataIndex == 0) {
      displayWeather(outerWeatherData, "current", dataDate, "fahrenheit");
    } else {
      displayWeather(outerWeatherData, "future", dataDate, "fahrenheit");
    }
  }
});

//Event to change the temps based degreeType that was chosen

