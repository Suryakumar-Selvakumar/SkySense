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
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

function iconBackgroundSetter(icon, weatherData, weatherDiv) {
  if (weatherData.currentConditions.icon === "snow") {
    icon.src = snow;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #e0f7fa, #ffffff);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "snow-showers-day") {
    icon.src = snowShowersDay;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #9fc8e8, #d7eaff, #ffffff);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "snow-showers-night") {
    icon.src = snowShowersNight;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #2c3e50, #a1c4fd, #ffffff);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "thunder-rain") {
    icon.src = thunderRain;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #434343, #576574, #1e272e);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "thunder-showers-day") {
    icon.src = thunderShowersDay;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #616161, #e0e0e0, #757575);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "thunder-showers-night") {
    icon.src = thunderShowersNight;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #0f2027, #203a43, #2c5364);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "rain") {
    icon.src = rain;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #a1c4fd, #c2e9fb);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "showers-day") {
    icon.src = showersDay;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #b6fbff, #83a4d4);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "showers-night") {
    icon.src = showersNight;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #1e3c72, #2a5298);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "fog") {
    icon.src = fog;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #e0eafc, #cfdef3);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "wind") {
    icon.src = wind;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #d7d2cc, #304352);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "cloudy") {
    icon.src = cloudy;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #bdc3c7, #2c3e50);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "partly-cloudy-day") {
    icon.src = partlyCloudyDay;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #ffffff, #bdc3c7, #ffefba);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "partly-cloudy-night") {
    icon.src = partlyCloudyNight;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #2c3e50, #0f2027);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "clear-day") {
    icon.src = clearDay;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #56ccf2, #2f80ed);background-repeat: no-repeat;background-size: cover;`;
  } else if (weatherData.currentConditions.icon === "clear-night") {
    icon.src = clearNight;
    weatherDiv.style.cssText = `background: radial-gradient(circle, #2c3e50, #0f2027);background-repeat: no-repeat;background-size: cover;`;
  }
}

async function fetchTimeZone(latitude, longitude, date, time) {
  const dateDifferenceInSeconds = (dateInitial, dateFinal) =>
    (dateFinal - dateInitial) / 1_000;
  const currentDate = `${date}T${time}Z`;
  const timeSeconds = dateDifferenceInSeconds(
    new Date("1970-01-01T00:00:00Z"),
    new Date(currentDate)
  );

  let baseUrl = "https://maps.googleapis.com/maps/api/timezone/json?location";
  const url =
    baseUrl +
    `=${latitude},${longitude}&timestamp=${timeSeconds}&key=AIzaSyB7W9b6lNxJhDPV72E58qQyY06gppgT6cY`;
  const response = await fetch(url, { mode: "cors" });
  const timeZoneData = await response.json();
  return timeZoneData.timeZoneName
    .split(/\s/)
    .reduce((response, word) => (response += word.slice(0, 1)), "");
}

async function displayWeather(weatherData) {
  const mainContent = document.querySelector(".main-content");
  const weatherDiv = document.createElement("div");
  weatherDiv.classList.add("weather-div");

  const icon = document.createElement("img");
  icon.classList.add("current-icon");
  iconBackgroundSetter(icon, weatherData, weatherDiv);

  const latitude = weatherData.latitude;
  const longitude = weatherData.longitude;
  const date = weatherData.days[0].datetime;
  const time = weatherData.currentConditions.datetime;
  const timeZone = await fetchTimeZone(latitude, longitude, date, time);

  const currentTime = weatherData.currentConditions.datetime.substring(0, 5);
  const currentHours = currentTime.substring(0, 2),
    currentMinutes = currentTime.slice(-2);
  const currentTimeFormated = formatAMPM(currentHours, currentMinutes);
  const datetime = document.createElement("p");
  datetime.classList.add("current-datetime");
  datetime.textContent = `${currentTimeFormated}` + " " + timeZone;

  // const conditions = document.createElement("p");
  // conditions.classList.add("current-conditions");

  const tempMaxMin = document.createElement("p");
  tempMaxMin.classList.add("current-temp-max-min");
  tempMaxMin.textContent =
    "High " +
    weatherData.days[0].tempmax.toFixed() +
    "\u02DA" +
    " \uFF5C " +
    "Low " +
    weatherData.days[0].tempmin.toFixed() +
    "\u02DA";

  const humidity = document.createElement("p");
  humidity.classList.add("current-humidity");
  humidity.textContent =
    "\u{1F4A7}" + weatherData.currentConditions.humidity.toFixed();

  const temp = document.createElement("p");
  temp.classList.add("current-temp");
  temp.textContent = `${weatherData.currentConditions.temp.toFixed()}\u02DA`;

  const description = document.createElement("p");
  description.classList.add("current-description");
  description.textContent = `${weatherData.description.slice(0, weatherData.description.length - 1)}`;

  const conditions = document.createElement("p");
  conditions.classList.add("current-conditions");
  conditions.textContent = `${weatherData.currentConditions.conditions}`;

  const address = document.createElement("p");
  address.classList.add("current-address");
  address.textContent = `${weatherData.resolvedAddress}`;

  const addressDateTimeDiv = document.createElement("div");
  addressDateTimeDiv.classList.add("address-date-time");
  addressDateTimeDiv.append(address, datetime);

  const tempConditionstempMaxMinDiv = document.createElement("div");
  tempConditionstempMaxMinDiv.classList.add("temp-conditions-tempmaxmin");
  tempConditionstempMaxMinDiv.append(temp, conditions, tempMaxMin);

  const iconHumidityDiv = document.createElement("div");
  iconHumidityDiv.classList.add("icon-humidity");
  iconHumidityDiv.append(icon, humidity);

  const containerDiv = document.createElement("div");
  containerDiv.classList.add("container-div");
  containerDiv.append(tempConditionstempMaxMinDiv, iconHumidityDiv);

  weatherDiv.append(addressDateTimeDiv, containerDiv, description);
  mainContent.appendChild(weatherDiv);
}

export { displayWeather };
