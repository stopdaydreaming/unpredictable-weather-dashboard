// Use the [OpenWeather API](https://openweathermap.org/api) to retrieve weather data for cities.
// The documentation includes a section called "How to start" that will provide basic setup and usage
// instructions. Use `localStorage` to store any persistent data.
// ```
// AS A traveler
// I WANT to see the weather outlook for multiple cities
// SO THAT I can plan a trip accordingly
// ```
// -GIVEN a weather dashboard with form inputs
// -WHEN I search for a city
// -THEN I am presented with current and future conditions for that city and that city is added
// to the search history
// -WHEN I view current weather conditions for that city
// -THEN I am presented with the city name, the date, an icon representation of weather conditions,
// the temperature, the humidity, the wind speed, and the UV index
// -WHEN I view the UV index
// -THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// -WHEN I view future weather conditions for that city
// -THEN I am presented with a 5-day forecast that displays the date, an icon representation of
// weather conditions, the temperature, and the humidity
// -WHEN I click on a city in the search history
// -THEN I am again presented with current and future conditions for that city
// -WHEN I open the weather dashboard
// -THEN I am presented with the last searched city forecast
// ```

$(document).ready(function() {
    var date = new Date().toLocaleDateString() ;
    $("#date").text(date);

  $("#search-form").on("submit", function(e) {
    e.preventDefault();

    var date = new Date().toLocaleDateString() ;

    //get value out of input
    var searchInputEl = $("#search-input");

    var searchRequest = searchInputEl.val();
    if(searchRequest === null){
        alert("please enter a city")
    }
    else {
        console.log(searchRequest);
    }

    //use the value to build a query url
    var apiKey = "4932ede5556ff672b967c5fbc2310b12";
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?" +
    "q="+ searchRequest + "&appid=" + apiKey;

    //use the query url to make an ajax call
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
        console.log(response);
      // Transfer content to HTML
      $("#city").text(response.name);
      $("#date").text(date);

      var weatherIcon = response.weather[0].description;
      if(weatherIcon === "clear sky"){
        $("#weather-icon").addClass('fa-sun');
      }
      else {
        $("#weather-icon").addClass('fa-cloud-sun');
      }

      var tempF = (response.main.temp - 273.15) * 1.8 + 32;
      // add temp content to html
      $("#tempF").text("Temperature: " + tempF.toFixed(2));
      $("#humidity").text("Humidity: " + response.main.humidity + "%");
      $("#wind").text("Wind Speed: " + response.wind.speed);
    });
  });
});
