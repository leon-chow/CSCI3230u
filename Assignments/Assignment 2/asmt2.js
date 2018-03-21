var key = "ee6968667b034938af1152649182103";

$(document).ready(function() {
  $("#goButton").click( function() {
    downloadWeather();
    //downloadForecast();
  })
})

function downloadWeather() {
  $("#weather").html("<div id= title> Temperature </br> </div>");
  var url = "http://api.apixu.com/v1/forecast.json?q=43.944847,-78.891703&key=" + key;
  $.getJSON(url, function(data) {
    //condition
    var condition = data.current.condition.text;
    var cloudCover = data.current.cloud;
    var humidity = data.current.humidity;
    var pressureMB = data.current.pressure_mb;

    //temperature
    var currentTemp = data.current.temp_c;
    //var highTemp = data.forecast.forecastday=>.maxtemp_c;

    //wind
    var windDirection = data.current.wind_dir;
    var windSpeed = data.current.wind_kph;

    var feelsLike = data.current.feelslike_c;
    $("#weather").append("<div>Current: " + currentTemp + "°C</br>Low:°C </br>" +// lowTemp </br>High:" + highTemp + "°C</br>Feels Like:" + feelsLike + "°C</div>");
                         "</br>Condition </br> </br>" + condition + "</br>Cloud cover:" + cloudCover + "%</br>Humidty:" + humidity +
                         "%</br>Pressure:" + pressureMB + "mB</br> </br> Wind </br> </br> Direction:" + windDirection + "°</br>Speed: " +
                         windSpeed + "km/h</br>");
  });
};

/*function downloadForecast() {
  $.getJSON(url, function(data) {
    $("#weather").html("<div id= title> Forecast: </br> </div>");
      var "http://api.apixu.com/v1/forecast.json?q=43.944847,-78.891703&days=7&key=" + key;
      $("#weather").html("<table id = forecastTable> <tr> <td> Date </td> <td> Condition </td> <td> High </td> <td> Low </td> <td> Wind </td> <td> Outlook </td> </tr>");

}*/
