//Leon Chow 100617197
//key to get current and 7 days of weather
var key = "ee6968667b034938af1152649182103";

$(document).ready(function() {
  $("#goButton").click( function() {
    //parses both longitude and latitude text box values to float
    var longitude = parseFloat($("#lon").val());
    var latitude = parseFloat($("#lat").val());
    //checks if longitude and latitude exist before functions are called
    if (longitude && latitude) {
      downloadWeather(longitude, latitude);
      downloadForecast(longitude, latitude);
      showMap(longitude, latitude);
    } else {
      alert("Please enter non-zero values for longitude and latitude.");
    }
  })
})

//function that takes longitude and latitude as parameters to display current weather
function downloadWeather(longitude, latitude) {
  var url = "http://api.apixu.com/v1/forecast.json?q=" + latitude + "," + longitude + "&key=" + key;
  $.getJSON(url, function(data) {

    //condition variables
    var condition = data.current.condition.text;
    var cloudCover = data.current.cloud;
    var humidity = data.current.humidity;
    var pressureMB = data.current.pressure_mb;

    //temperature variables
    var currentTemp = data.current.temp_c;
    var highTemp = data.forecast.forecastday[0].day.maxtemp_c;
    var lowTemp = data.forecast.forecastday[0].day.mintemp_c;
    var feelsLike = data.current.feelslike_c;

    //wind variables
    var windDirection = data.current.wind_dir;
    var windSpeed = data.current.wind_kph;

    //creates a div with class weather to display the current weather information to the user
    $("#weather").addClass("weather");
    $("#weather").html("<div id= title> <h3> Temperature </h3> </div>");
    $("#weather").append("<div>Current: " + currentTemp + "°C</br>Low: " + lowTemp + "°C</br>High:" + highTemp + "°C</br>Feels Like:" + feelsLike + "°C</div>" +
                         "<h3>Condition</h3>" + condition + "</br>Cloud cover:" + cloudCover + "%</br>Humidty:" + humidity +
                         "%</br>Pressure:" + pressureMB + "mB </br> <h3> Wind </h3> Direction:" + windDirection + "°</br>Speed: " +
                         windSpeed + "km/h</br> </div>");
  });
};

//function that takes longitude and latitude as parameters to display up to 7 days of weather
function downloadForecast(longitude, latitude) {
  //url that uses key defined earlier
  var imgurl = "http://www.apixu.com/doc/Apixu_weather_conditions.json";
  var url = "http://api.apixu.com/v1/forecast.json?q=" + latitude + "," + longitude + "&days=7&key=" + key;
  $.getJSON(url, function(data) {

    //arrays for table data
    var days = [];
    var dayHigh = [];
    var dayLow = [];
    var dayWind = [];
    var dayOutlook = [];
    var dayConditionCode = [];
    var imgArray = [];

    //assigns each array index with a value from the weather API
    for (var i = 0; i < data.forecast.forecastday.length; i++) {
      days[i] = data.forecast.forecastday[i].date;
      dayHigh[i] = data.forecast.forecastday[i].day.maxtemp_c;
      dayLow[i] = data.forecast.forecastday[i].day.mintemp_c;
      dayWind[i] = data.forecast.forecastday[i].day.maxwind_kph;
      dayOutlook[i] = data.forecast.forecastday[i].day.condition.text;
      dayConditionCode[i] = data.forecast.forecastday[i].day.condition.code;
    }

    //creates the table data and borders to be appended to the forecast div
    var forecastTable = "<table id='forecastTable' class='table'> <h3> Forecast: </h3> </br> ";
    forecastTable += "<tr border-bottom: 1px solid black; border-top: 1px solid black; border-collapse: collapse> " +
    "<th> Date </th> <th> Condition </th> <th> High </th> <th> Low </th> <th> Wind </th> <th> Outlook </th> </tr>";

    for (var i = 0; i < data.forecast.forecastday.length; i++) {
      var img;
      if (dayConditionCode[i] == 1000) {
        //sunny, clear
        img = "<img src=\"asmt2_images/images/800.png\">";
      } else if (dayConditionCode[i] == 1003) {
        //partly cloudy
        img = "<img src=\"asmt2_images/images/802.png\">";
      } else if (dayConditionCode[i] == 1006 || dayConditionCode[i] == 1030 || dayConditionCode[i] == 1135 || dayConditionCode[i] == 1147) {
        //cloudy, mist, fog, freezing fog
        img = "<img src=\"asmt2_images/images/803.png\">";
      } else if (dayConditionCode[i] == 1009) {
        //overcast
        img = "<img src=\"asmt2_images/images/804.png\">";
      } else if (dayConditionCode[i] == 1063 || dayConditionCode[i] == 1180 || dayConditionCode[i] == 1183 || dayConditionCode[i] == 1198  || dayConditionCode[i] == 1150 || dayConditionCode[i] == 1240) {
        //patchy rain possible, patchy light rain, light rain, freezing light rain
        img = "<img src=\"asmt2_images/images/300.png\">";
      } else if (dayConditionCode[i] == 1066 || dayConditionCode[i] == 1210 || dayConditionCode[i] == 1213 || dayConditionCode[i] == 1255 || dayConditionCode[i] == 1261) {
        //patchy snow possible, light snow
        img = "<img src=\"asmt2_images/images/600.png\">";
      } else if (dayConditionCode[i] == 1069 || dayConditionCode[i] == 1204 || dayConditionCode[i] == 1249 || dayConditionCode[i] == 1252 || dayConditionCode[i] == 1264) {
        //patchy sleet possible, light sleet, moderate snow
        img = "<img src=\"asmt2_images/images/601.png\">";
      } else if (dayConditionCode[i] == 1072 || dayConditionCode[i] == 1207 || dayConditionCode[i] == 1216 || dayConditionCode[i] == 1219) {
        //patchy freezing drizzle, moderate or heavy sleet
        img = "<img src=\"asmt2_images/images/504.png\">";
      } else if (dayConditionCode[i] == 1087 || dayConditionCode[i] == 1168 || dayConditionCode[i] == 1273 || dayConditionCode[i] == 1276 || dayConditionCode[i] == 1279 || dayConditionCode[i] == 1282) {
        //thunder outbreaks possible
        img = "<img src=\"asmt2_images/images/201.png\">";
      } else if (dayConditionCode[i] == 1114 || dayConditionCode[i] == 1117 || dayConditionCode[i] == 1225 || dayConditionCode[i] == 1237 || dayConditionCode[i] == 1258) {
        //blowing snow,blizzard
        img = "<img src=\"asmt2_images/images/602.png\">";
      } else if (dayConditionCode[i] == 1171) {
        //heavy freezing drizzle
        img = "<img src=\"asmt2_images/images/504.png\">";
      } else if (dayConditionCode[i] == 1186 || dayConditionCode[i] == 1192 || dayConditionCode[i] == 1201 || dayConditionCode[i] == 1243 || dayConditionCode[i] == 1246) {
        //moderate rain, heavy rain at times, moderate of heavy freezing rain
        img = "<img src=\"asmt2_images/images/301.png\">";
      } else if (dayConditionCode[i] == 1195) {
        //heavy rain
        img = "<img src=\"asmt2_images/images/304.png\">";
      }
      forecastTable += ("<tr> <td> " + days[i] + "</td> <td>" + img + " </td> <td>" +
        dayHigh[i] + "°C</td> <td> " + dayLow[i] + "°C</td> <td> " + dayWind[i] + "km/h</td> <td>" +
        dayOutlook[i] + " </td> </tr>");
    }
    $("#forecast").html(forecastTable);
  });
}

//function that takes longitude and latitude as parameters to display current location in google maps
function showMap(longitude, latitude) {
  //variable for map settings
  var mapOptions = {
	    center: { lat: latitude, lng: longitude},
	    zoom: 8
	};
  var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

  //marks current location on google maps
  var marker = new google.maps.Marker ({
    position: { lat: latitude, lng: longitude},
    map: map,
    title: 'You are here!'
  });

  $("#map-canvas").append(map);
}
