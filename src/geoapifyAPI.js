// Using the geoapify API to get the user's address based on their coordinates
export function getAddress(lat, lon) {
  return fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=4187d0f110c545b29fdba376265750a3`
  )
    .then((result) => result.json())
    .then((result) => {
      if (result && result.results.length) {
        return result.results[0].city;
      }

      return null;
    });
}
