var key = "ee6968667b034938af1152649182103";

$(document).ready(function() {
  $("#goButton").click( function() {
    downloadWeather();
    downloadForecast();
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
    //var highTemp = data.forecast.forecastday.day.max_temp_c;

    //wind
    var windDirection = data.current.wind_dir;
    var windSpeed = data.current.wind_kph;

    var feelsLike = data.current.feelslike_c;
    $("#weather").append("<div>Current: " + currentTemp + "°C</br>Low:°C </br>" +// lowTemp </br>High:" + highTemp + "°C</br>Feels Like:" + feelsLike + "°C</div>");
                         "</br>Condition </br> </br>" + condition + "</br>Cloud cover:" + cloudCover + "%</br>Humidty:" + humidity +
                         "%</br>Pressure:" + pressureMB + "mB</br> </br> Wind </br> </br> Direction:" + windDirection + "°</br>Speed: " +
                         windSpeed + "km/h</br> </div>");
  });
};

function downloadForecast() {
  var url = "http://api.apixu.com/v1/forecast.json?q=43.944847,-78.891703&days=7&key=" + key;
  var imgurl = "http://www.apixu.com/doc/Apixu_weather_conditions.json";
  $.getJSON(url, function(data) {
    //dates
    var days;

    var dayOne = data.forecast.forecastday[0].date;
    var dayTwo = data.forecast.forecastday[1].date;
    var dayThree = data.forecast.forecastday[2].date;
    var dayFour = data.forecast.forecastday[3].date;
    var dayFive = data.forecast.forecastday[4].date;
    var daySix = data.forecast.forecastday[5].date;
    var daySeven = data.forecast.forecastday[6].date;

    $.getJSON(imgurl, function(info) {
      var conditionOne = data.forecast.forecastday[0].day.condition.icon;
      /*var conditionTwo = data.forecast.forecastday[2];
      var conditionThree = data.forecast.forecastday[2].condition[1];
      var conditionFour = data.forecast.forecastday[3].condition[1];
      var conditionFive = data.forecast.forecastday[4].condition[1];
      var conditionSix = data.forecast.forecastday[5].condition[1];
      var conditionSeven = data.forecast.forecastday[6].condition[1];*/

    console.log(conditionOne);
    $("#forecast").html("<div id = 'tableHolder'> Forecast: </br> <table id = 'forecastTable'>" +
        "<tr> <th> Date </th> <th> Condition </th> <th> High </th> <th> Low </th> <th>" +
        "Wind </th> <th> Outlook </th> </tr> <tr> <td> " + dayOne + "</td> <td>" + conditionOne + " </td> </table> </div>");
      });
  });
}
