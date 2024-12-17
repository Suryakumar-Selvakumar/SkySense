// timeZone API to retrieve a location's timezone with its latitude, longitude, date and time
export async function fetchTimeZone(latitude, longitude) {
  let baseUrl = "https://timeapi.io/api/timezone/coordinate?";
  console.log(latitude, longitude);
  const url = baseUrl + `latitude=${latitude}&longitude=${longitude}`;
  const response = await fetch(url, { mode: "cors" });
  const timeZoneData = await response.json();
  console.log(timeZoneData);
  return timeZoneData.dstInterval
    ? timeZoneData.dstInterval.dstName
    : timeZoneData.timeZone
}
