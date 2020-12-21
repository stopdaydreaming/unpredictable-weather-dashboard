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
  var date = new Date().toLocaleDateString();
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
    var queryUrl =
      "https://api.openweathermap.org/data/2.5/weather?" +
      "q=" +
      citySearch +
      "&appid=" +
      apiKey;

    //use the query url to make an ajax call
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(function(response) {
      console.log(response);

                   //city list
                   var ul = $("<ul>");
                   ul.addClass("list-group p-3");
                   var li = $("<li>");
                   li.addClass("list-group-item");
                   li.text(response.name);
                   $(ul).append(li);
                   $("#city-list").append(ul);

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
      var queryUrlUVI =
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        apiKey;
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
        } else if (uvIndex > 2 && uvIndex < 5) {
          $("#uvi").addClass("btn-yellow");
        } else if (uvIndex > 5 && uvIndex < 7) {
          $("#uvi").addClass("btn-orange");
        } else if (uvIndex > 7 && uvIndex < 10) {
          $("#uvi").addClass("btn-danger");
        } else if (uvIndex > 11) {
          $("#uvi").addClass("btn-purple");
        }
        $("#uvi").text(response.value);
      });

      // 5 DAY FORECAST
      var queryUrlForecast =
        "http://api.openweathermap.org/data/2.5/forecast?q=" +
        citySearch +
        "&appid=" +
        apiKey;
      // 5 day forecast ajax request
      $.ajax({
        url: queryUrlForecast,
        method: "GET"
      }).then(function(response) {
        console.log(response);

        // function declaration
        function formatDate(date) {
          var date = new Date(date);
          if (!isNaN(date.getTime())) {
            var day = date.getDate().toString();
            var month = (date.getMonth() + 1).toString();
            return (
              (month[1] ? month : "0" + month[0]) +
              "/" +
              (day[1] ? day : "0" + day[0]) +
              "/" +
              date.getFullYear()
            );
          }
        }

        var forecastList = response.list;
        console.log(forecastList);
        for (var i = 0; i < forecastList.length; i++) {
          //javascript variables
          var forecastDate = forecastList[i].dt_txt;
          var foreDate = forecastDate.substr(0, 10);
          var forecastTemp = forecastList[i].main.temp;
          var foreTemp = (forecastTemp - 273.15) * 1.8 + 32;
          var forecastHum = forecastList[i].main.humidity;
          // generate weather icons
          var forecastIconCode = forecastList[i].weather[0].icon;
          console.log(forecastIconCode);
          var forecastIconUrl =
            "http://openweathermap.org/img/wn/" + forecastIconCode + ".png";
            console.log(forecastIconUrl);

          // 5 day forecast card
          $("#forecast-date").text(formatDate(foreDate));
          $("#weather-forecast-icon").attr("src", forecastIconUrl);
          $("#forecast-temp").text("Temp: " + Math.round(foreTemp));
          $("#forecast-hum").text("Humidity: " + forecastHum + "%");
          //append


        }
      });
    });
  });
});
