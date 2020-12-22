$(document).ready(function() {
  // DOM VARIABLES

  var date = new Date().toLocaleDateString();
  var dt = new Date();
  var month = dt.getMonth() + 1;
  var day = dt.getDate();
  var year = dt.getFullYear();
  var currDate = month + "/" + day + "/" + year;
  $("#date").text(currDate);

  // FUNCTION DEFINITIONS
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
      // convert temperature
      var tempF = (response.main.temp - 273.15) * 1.8 + 32;

      //generate weather icons
      var iconCode = response.weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";

      // add content to html
      $("#city").text(response.name);
      $("#date").removeClass("hide");
      $("#date").text(date);
      $("#tempF").text("Temperature: " + tempF.toFixed(2) + " °F");
      $("#humidity").text("Humidity: " + response.main.humidity + "%");
      $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
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
        $("#uvi").text("UV Index: " + response.value);
      });

      // 5 DAY FORECAST
      var queryUrlForecast =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&exclude=current,hourly,minutely,alerts&appid=" +
        apiKey;

      // 5 day forecast ajax request
      $.ajax({
        url: queryUrlForecast,
        method: "GET"
      }).then(function(response) {
        //data set 01
        var forecastDate = response.daily[0].dt;
        var fDate = forecastDate;
        // var fDate = forecastDate.toString().substr(0, 8);
        var forecastTemp = response.daily[0].temp.day;
        var fTemp = (forecastTemp - 273.15) * 1.8 + 32;
        var forecastHum = response.daily[0].humidity;
        // generate weather icons
        var forecastIconCode = response.daily[0].weather[0].icon;
        var forecastIconUrl =
          "http://openweathermap.org/img/wn/" + forecastIconCode + ".png";

        $("#forecast-date-1").text(formatDate(fDate));
        $("#weather-forecast-icon-1").attr("src", forecastIconUrl);
        $("#forecast-temp-1").text("Temp: " + Math.round(fTemp) + " °F");
        $("#forecast-hum-1").text("Humidity: " + forecastHum + "%");

        //data set 02
        var forecastDate = response.daily[1].dt;
        var fDate = forecastDate;
        // var fDate = forecastDate.toString().substr(0, 8);
        var forecastTemp = response.daily[1].temp.day;
        var fTemp = (forecastTemp - 273.15) * 1.8 + 32;
        var forecastHum = response.daily[1].humidity;
        // generate weather icons
        var forecastIconCode = response.daily[1].weather[0].icon;
        var forecastIconUrl =
          "http://openweathermap.org/img/wn/" + forecastIconCode + ".png";

        $("#forecast-date-2").text(formatDate(fDate));
        $("#weather-forecast-icon-2").attr("src", forecastIconUrl);
        $("#forecast-temp-2").text("Temp: " + Math.round(fTemp) + " °F");
        $("#forecast-hum-2").text("Humidity: " + forecastHum + "%");

        //data set 03
        var forecastDate = response.daily[2].dt;
        var fDate = forecastDate;
        // var fDate = forecastDate.toString().substr(0, 8);
        var forecastTemp = response.daily[2].temp.day;
        var fTemp = (forecastTemp - 273.15) * 1.8 + 32;
        var forecastHum = response.daily[2].humidity;
        // generate weather icons
        var forecastIconCode = response.daily[2].weather[0].icon;
        var forecastIconUrl =
          "http://openweathermap.org/img/wn/" + forecastIconCode + ".png";

        $("#forecast-date-3").text(formatDate(fDate));
        $("#weather-forecast-icon-3").attr("src", forecastIconUrl);
        $("#forecast-temp-3").text("Temp: " + Math.round(fTemp) + " °F");
        $("#forecast-hum-3").text("Humidity: " + forecastHum + "%");

        //data set 04
        var forecastDate = response.daily[3].dt;
        var fDate = forecastDate;
        // var fDate = forecastDate.toString().substr(0, 8);
        var forecastTemp = response.daily[3].temp.day;
        var fTemp = (forecastTemp - 273.15) * 1.8 + 32;
        var forecastHum = response.daily[3].humidity;
        // generate weather icons
        var forecastIconCode = response.daily[3].weather[0].icon;
        var forecastIconUrl =
          "http://openweathermap.org/img/wn/" + forecastIconCode + ".png";

        $("#forecast-date-4").text(formatDate(fDate));
        $("#weather-forecast-icon-4").attr("src", forecastIconUrl);
        $("#forecast-temp-4").text("Temp: " + Math.round(fTemp) + " °F");
        $("#forecast-hum-4").text("Humidity: " + forecastHum + "%");

        //data set 05
        var forecastDate = response.daily[4].dt;
        var fDate = forecastDate;
        // var fDate = forecastDate.toString().substr(0, 8);
        var forecastTemp = response.daily[4].temp.day;
        var fTemp = (forecastTemp - 273.15) * 1.8 + 32;
        var forecastHum = response.daily[4].humidity;
        // generate weather icons
        var forecastIconCode = response.daily[4].weather[0].icon;
        var forecastIconUrl =
          "http://openweathermap.org/img/wn/" + forecastIconCode + ".png";

        $("#forecast-date-5").text(formatDate(fDate));
        $("#weather-forecast-icon-5").attr("src", forecastIconUrl);
        $("#forecast-temp-5").text("Temp: " + Math.round(fTemp) + " °F");
        $("#forecast-hum-5").text("Humidity: " + forecastHum + "%");
      });
    });
  });
});
