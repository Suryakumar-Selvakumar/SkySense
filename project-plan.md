**Given your inputs, what are the steps necessary to return the desired output?**

1. Design the DOM that displays the weather details.

    1.1. Add a form with a search input field at the top in the navbar that the user can use to enter the location they want.

        1.1.1. You can add an eventListener to the submit button of the form that will call the API retrieval function with the entered location so that it can retrieve the data of the entered location. 

    1.2. Set up a mainContainerDiv that will display all the weather details after the user enters the location.

    1.3. Figure out what details you wanna display on the screen other than just temperature. Get some inspiration.

        1.3.1. Get these data from the currentConditions: conditions, datetime, feelslike, humidity, temp.

        1.3.2. Get these data from days: conditions, datetime, description, humidity, temp, tempmax, tempmin for all 15 days in the days array. 

        1.3.3. Get the description, resolvedAddress

2. Create a module that does the information retrieval from the Visual Crossing API

    2.1. Use the same code you used for the giphy API but refactor to work with the weather API. You know the logic.

    2.2. You have to first console.log() the data returned from the API. Find out which particular data you want. 

        2.2.1. Fetch exactly that data alone and export that data.

3. Create a module that takes the data obtained from the API retrieval module and displays all the elements in the DOM.

    3.1. Create appropriate divs or paras or other elements for each of the data types.

4. Try to make a creative UI!

    4.1. Use box-shadow inset with blur to set up display styles for the displayWeatherDiv that corresponds to the weather that gets returned for the entered location.

    4.2. Fix the background of the location form.

    4.3. Figure out how you add the appropriate timezone short-form from the timezone info you get from the API. Add that for all the places next to their respective time.

    4.4. Add mini info as cards below the weatherDiv that displays weather of the next 7 days including one for today at the start.

        4.4.0.5. Add the cards inside the displayCurrentWeather function. You can iterate through the DOM and add eventListeners to the each of the cards in index.js.

        4.4.1. Each card should have the day, weather condition icon and the high and low temps. Add a custom data-date attribute to the div elements that contains the date of that particular day.

        4.4.2. Upon clicking the card, the weather details for that day, should be displayed in the weatherDiv above. How?

            i) Add a state parameter to the displayWeather function that takes in either “current” or “future”.

            ii) If its current, then you add current weather values from the currentConditions object.

            iii)If its future, change everything except resolvedAddress in weatherDiv with the properties of the object in days array that corresponds to the date-time that was retrieved from the div that was clicked through its eventListener. (Day 0 is the special case where tempmin and tempmax remain the same)

    4.5. Add a errorDiv that displays location not found, please try again! with a red inset or light red background signifying the error.

    4.7. address, date-time, temp, min-temp, max-temp, icon, humidity, description.

5. Upon clicking the submit button of the form, a “LOADING..” text must be displayed. After the API is done retrieving the data, the loading text should be removed/hidden at which point the retrieved data will be displayed.

    5.1. create a loadingDiv either inside inside the callFetchAPI function or inside the eventListener that calls it. Inside displayWeather module, you actually already make the mainContent empty before displaying weatherDiv. So it should automatically be removed.

6. Additional Features:-

    i) Display the weather details of the user’s location on load. How? It’s quite easy, you just have to find a way to retrieve the user’s location details on website load and call the getWeatherData() function with that location.

    ii) Add a slider on the top-left of the site that will enable you to switch between Celsius and Fahrenheit. How? Add a degreeType parameter, that will display the degree based on the degreeType that was entered. Create two conditions for every instance where a temp value is used. 