
import { callFetchData } from "./fetchAPIData.js";
import "./style.css";

const mainContent = document.querySelector(".main-content");
const locationForm = document.querySelector(".location-form");

// Event listener to submit add task form and get the formData
locationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  new FormData(locationForm);
  locationForm.reset();
  locationForm.style.cssText = "visibility: hidden";
});

// Event listener to use the formData to call the todo constructor
locationForm.addEventListener("formdata", (e) => {
  const data = e.formData;
  const dataArray = [];
  let locationValue;
  for (const value of data.values()) {
    dataArray.push(value);
  }

  locationValue = dataArray[0];
  const weatherData = callFetchData(locationValue);
  console.log(weatherData);
});