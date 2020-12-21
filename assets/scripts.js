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

    // DOM VARIABLES
    var date = new Date().toLocaleDateString() ;
    $("#date").text(date);

    // FUNCTION DEFINITIONS
    // FUNCTION CALLS
    // EVENT LISTENERS

  $("#search-form").on("submit", function(e) {
    e.preventDefault();

    // JAVASCRIPT VARIABLES
    //get value out of input
    var searchInputEl = $("#search-input");
    var citySearch = searchInputEl.val();

    // OpenWeather API queries
    var apiKey = "4932ede5556ff672b967c5fbc2310b12";
    // build the basic query url
    var queryUrl = "https://api.openweathermap.org/data/2.5/weather?" +
    "q="+ citySearch + "&appid=" + apiKey;

    //use the query url to make an ajax call
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);

      // convert temperature
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;

      //generate weather icons
      var iconCode = response.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

      // add content to html
      $("#city").text(response.name);
      $("#date").text(date);
      $("#tempF").text("Temperature: " + tempF.toFixed(2));
      $("#humidity").text("Humidity: " + response.main.humidity + "%");
      $("#wind").text("Wind Speed: " + response.wind.speed);
      $("#weather-icon").attr("src", iconUrl);

      // UV Index
      // build the uvi query url
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      var queryUrlUVI = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
      //use the query url to make an ajax call
      $.ajax({
        url: queryUrlUVI,
        method: "GET"
      }).then(function(response) {
        // console.log(response);
        
        var uvIndex = response.value;
        // add class based on uvi conditions
        $("#uvi").empty();
        if (uvIndex < 2) {
          $("#uvi").addClass("btn-success"); 
        }
        else if (uvIndex > 2 && uvIndex < 5 ) {
          $("#uvi").addClass("btn-yellow"); 
        }
        else if (uvIndex > 5 && uvIndex < 7 ) {
          $("#uvi").addClass("btn-orange"); 
        }
        else if (uvIndex > 7 && uvIndex < 10 ) {
          $("#uvi").addClass("btn-danger"); 
        }
        else if (uvIndex > 11 ) {
          $("#uvi").addClass("btn-purple"); 
        }
        $("#uvi").text(response.value);
      });
      
      // 5 DAY FORECAST
      var queryUrlForecast = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&appid=" + apiKey;
      // 5 day forecast ajax request
      $.ajax({
          url: queryUrlForecast,
          method: "GET",
      }).then(function(response){
          console.log(response);
          var forecastDate = response.list[0].dt_txt;
          var fDate = forecastDate.substr(0,10);
        //   console.log(fDate);
          var forecastTemp = response.list[0].main.temp;
        //   console.log(forecastTemp);
          var forecastHum = response.list[0].main.humidity;
        //   console.log(forecastHum);
        //   console.log(response.list[0].main.temp);
      })
    });

  });
});
