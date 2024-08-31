// Function that formats the time retrieved from the timeline API as pm or am
function formatAMPM(hours, minutes) {
  var ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  var strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
}

// Function that returns the days for a date using getDay()
function getDayFunc(date) {
  let day = new Date(date).getDay();
  day += 1;
  if (day === 1) {
    return "Mon";
  } else if (day === 2) {
    return "Tue";
  } else if (day === 3) {
    return "Wed";
  } else if (day === 4) {
    return "Thu";
  } else if (day === 5) {
    return "Fri";
  } else if (day === 6) {
    return "Sat";
  } else {
    return "Sun";
  }
}

function celsiusToFahrenheit(c) {
  const f = c * (9 / 5) + 32;
  return f;
}

function fahrenheitToCelsius(f) {
  const c = ((f - 32) * 5) / 9;
  return c;
}

export { formatAMPM, getDayFunc, celsiusToFahrenheit, fahrenheitToCelsius };
