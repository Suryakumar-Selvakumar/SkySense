import snow from "./icons/snow.svg";
import snowShowersDay from "./icons/snow-showers-day.svg";
import snowShowersNight from "./icons/snow-showers-night.svg";
import thunderRain from "./icons/thunder.svg";
import thunderShowersDay from "./icons/thunder-showers-day.svg";
import thunderShowersNight from "./icons/thunder-showers-night.svg";
import rain from "./icons/rain.svg";
import showersDay from "./icons/showers-night.svg";
import showersNight from "./icons/showers-night.svg";
import fog from "./icons/fog.svg";
import wind from "./icons/wind.svg";
import cloudy from "./icons/cloudy.svg";
import partlyCloudyDay from "./icons/partly-cloudy-day.svg";
import partlyCloudyNight from "./icons/partly-cloudy-night.svg";
import clearDay from "./icons/clear-day.svg";
import clearNight from "./icons/clear-night.svg";

function formatAMPM(hours, minutes) {
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function iconSrcSetter(icon, weatherData) {
  if (weatherData.currentConditions.icon === "snow") {
    icon.src = snow;
  } else if (weatherData.currentConditions.icon === "snow-showers-day") {
    icon.src = snowShowersDay;
  } else if (weatherData.currentConditions.icon === "snow-showers-night") {
    icon.src = snowShowersNight;
  } else if (weatherData.currentConditions.icon === "thunder-rain") {
    icon.src = thunderRain;
  } else if (weatherData.currentConditions.icon === "thunder-showers-day") {
    icon.src = thunderShowersDay;
  } else if (weatherData.currentConditions.icon === "thunder-showers-night") {
    icon.src = thunderShowersNight;
  } else if (weatherData.currentConditions.icon === "rain") {
    icon.src = rain;
  } else if (weatherData.currentConditions.icon === "showers-day") {
    icon.src = showersDay;
  } else if (weatherData.currentConditions.icon === "showers-night") {
    icon.src = showersNight;
  } else if (weatherData.currentConditions.icon === "fog") {
    icon.src = fog;
  } else if (weatherData.currentConditions.icon === "wind") {
    icon.src = wind;
  } else if (weatherData.currentConditions.icon === "cloudy") {
    icon.src = cloudy;
  } else if (weatherData.currentConditions.icon === "partly-cloudy-day") {
    icon.src = partlyCloudyDay;
  } else if (weatherData.currentConditions.icon === "partly-cloudy-night") {
    icon.src = partlyCloudyNight;
  } else if (weatherData.currentConditions.icon === "clear-day") {
    icon.src = clearDay;
  } else if (weatherData.currentConditions.icon === "clear-night") {
    icon.src = clearNight;
  }
}

function displayCurrentWeather(weatherData) {
  const mainContent = document.querySelector(".main-content");
  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add("weather-div");

  const icon = document.createElement("img");
  icon.classList.add("current-icon");
  iconSrcSetter(icon, weatherData);

  const currentTime = weatherData.currentConditions.datetime.substring(0, 5);
  const currentHours = currentTime.substring(0, 2),
    currentMinutes = currentTime.slice(-2);
  const currentTimeFormated = formatAMPM(currentHours, currentMinutes);
  const datetime = document.createElement("p");
  datetime.classList.add("current-datetime");
  datetime.textContent = `${currentTimeFormated}`;

  const feelslike = document.createElement("p");
  feelslike.classList.add("current-feelslike");
  feelslike.textContent =
    "Feels like " + weatherData.currentConditions.feelslike + "\u02DA";

  const humidity = document.createElement("p");
  humidity.classList.add("current-humidity");
  humidity.textContent = `${weatherData.currentConditions.humidity}`;

  const temp = document.createElement("p");
  temp.classList.add("current-temp");
  temp.textContent = `${weatherData.currentConditions.temp}\u02DA`;

  const description = document.createElement("p");
  description.classList.add("current-description");
  description.textContent = `${weatherData.description}`;

  const address = document.createElement("p");
  address.classList.add("current-address");
  address.textContent = `${weatherData.resolvedAddress}`;

  const addressDateTimeDiv = document.createElement("div");
  addressDateTimeDiv.classList.add("address-date-time");
  addressDateTimeDiv.append(address, datetime);

  const tempFeelslikeDiv = document.createElement("div");
  tempFeelslikeDiv.classList.add("temp-feelslike");
  tempFeelslikeDiv.append(temp, feelslike);

  const tempFeelslikeHumidityDiv = document.createElement("div");
  tempFeelslikeHumidityDiv.classList.add("temp-feelslike-humidity");
  tempFeelslikeHumidityDiv.append(tempFeelslikeDiv, humidity);

  const iconTempFeelslikeHumidityDiv = document.createElement("div");
  iconTempFeelslikeHumidityDiv.classList.add("icon-temp-feelslike-humidity");
  iconTempFeelslikeHumidityDiv.append(tempFeelslikeHumidityDiv, icon);

  weatherDiv.append(
    addressDateTimeDiv,
    iconTempFeelslikeHumidityDiv,
    description
  );
  mainContent.appendChild(weatherDiv);
}

export { displayCurrentWeather };
