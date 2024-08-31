
// timeZone API to retrieve a location's timezone with its latitude, longitude, date and time
export async function fetchTimeZone(latitude, longitude, date, time) {
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