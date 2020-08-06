$(document).ready(function(){

var cities = [];

function currentWeather(name) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    name +
    "&appid=211cbbea9a28f4130ddc86eabce2af01";

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    // Retereiving name for city
    console.log(response.name);
    $("#cityName").text(response.name);

    //getting current date in MM/DD/YYYY format
    $("#currDay").text(moment(response.dt, "X").format("MM/DD/YYYY"));

    //getting Icon for current card
    var currentIcon = response.weather[0].icon;
    var iconUrl = "http://openweathermap.org/img/wn/" + currentIcon + ".png";
    $("#wIcon").attr("src", iconUrl);

    console.log(response.main.temp);
    //getting temp in kelvin
    var kelvinTemp = response.main.temp;
    //converting kelvin to F
    var fTemp = (kelvinTemp - 273.15) * 1.8 + 32;
    //displaying temp
    $("#curTemp").text("Temperature: " + fTemp.toFixed(0) + " F");
    //getting current weather icon

    //getting humidity
    console.log(response.main.humidity);
    $("#curHum").text("Humidity: " + response.main.humidity);
    //getting windspeed
    console.log(response.wind.speed);
    $("#curWind").text("Windspeed: " + response.wind.speed);

    // getting lattitude and longitude 
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    //calling it to the function
    getforcast(lat, lon);
    $(".container").show();
  
  });
}
//creating function to get the 5 day forcast 
function getforcast(lat, lon) {
  var forcastURL =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=hourly,minutely&appid=211cbbea9a28f4130ddc86eabce2af01";

  $.ajax({
    url: forcastURL,
    method: "GET",
  }).then(function (response) {
    console.log(response);

    for (var i = 0; i < response.daily.length; i++) {
      //Print the day date in MM/DD/YYYY format

      $("#day1").text(moment(response.daily[1].dt, "X").format("MM/DD/YYYY"));

      $("#day2").text(moment(response.daily[2].dt, "X").format("MM/DD/YYYY"));

      $("#day3").text(moment(response.daily[3].dt, "X").format("MM/DD/YYYY"));

      $("#day4").text(moment(response.daily[4].dt, "X").format("MM/DD/YYYY"));

      $("#day5").text(moment(response.daily[5].dt, "X").format("MM/DD/YYYY"));
    }

    //day1
    
    //Icon for day 1
    var icon1 = response.daily[1].weather[0].icon;
    iconUrl = "http://openweathermap.org/img/wn/" + icon1 + ".png";
    $("#wIcon1").attr("src", iconUrl);

    //Getting Day1 Temp
    var kelvinTemp1 = response.daily[1].temp.day;
    var fTemp1 = (kelvinTemp1 - 273.15) * 1.8 + 32;
    $("#temp1").text("Temperature: " + fTemp1.toFixed(0) + "F");

    //Getting day1 humidity
    $("#hum1").text("Humidity: " + response.daily[1].humidity);

    //Getting day1 Wind
    $("#wind1").text("Windspeed: " + response.daily[1].wind_speed);

    //day 2

    //Icon for day 2
    var icon2 = response.daily[2].weather[0].icon;
    iconUrl = "http://openweathermap.org/img/wn/" + icon2 + ".png";
    $("#wIcon2").attr("src", iconUrl);

    //Getting Day2 Temp
    var kelvinTemp2 = response.daily[2].temp.day;
    var fTemp2 = (kelvinTemp2 - 273.15) * 1.8 + 32;
    $("#temp2").text("Temperature: " + fTemp2.toFixed(0) + "F");

    //Getting day2 humidity
    $("#hum2").text("Humidity: " + response.daily[2].humidity);
    //Getting day2 Wind
    $("#wind2").text("Windspeed: " + response.daily[2].wind_speed);

    //day 3

    //Icon for day 3
    var icon3 = response.daily[3].weather[0].icon;
    iconUrl = "http://openweathermap.org/img/wn/" + icon3 + ".png";
    $("#wIcon3").attr("src", iconUrl);

    //Getting Day3 Temp
    var kelvinTemp3 = response.daily[3].temp.day;
    var fTemp3 = (kelvinTemp3 - 273.15) * 1.8 + 32;
    $("#temp3").text("Temperature: " + fTemp3.toFixed(0) + "F");

    //Getting day3 humidity
    $("#hum3").text("Humidity: " + response.daily[3].humidity);
    //Getting day3 Wind
    $("#wind3").text("Windspeed: " + response.daily[3].wind_speed);

    //day 4

    //Icon for day 4
    var icon4 = response.daily[4].weather[0].icon;
    iconUrl = "http://openweathermap.org/img/wn/" + icon4 + ".png";
    $("#wIcon4").attr("src", iconUrl);

    //Getting Day4 Temp
    var kelvinTemp4 = response.daily[4].temp.day;
    var fTemp4 = (kelvinTemp4 - 273.15) * 1.8 + 32;
    $("#temp4").text("Temperature: " + fTemp4.toFixed(0) + "F");

    //Getting day4 humidity
    $("#hum4").text("Humidity: " + response.daily[4].humidity);
    //Getting day4 Wind
    $("#wind4").text("Windspeed: " + response.daily[4].wind_speed);

    //day 5

    //Icon for day 5
    var icon5 = response.daily[5].weather[0].icon;
    iconUrl = "http://openweathermap.org/img/wn/" + icon5 + ".png";
    $("#wIcon5").attr("src", iconUrl);

    //Getting Day5 Temp
    var kelvinTemp5 = response.daily[5].temp.day;
    var fTemp5 = (kelvinTemp1 - 273.15) * 1.8 + 32;
    $("#temp5").text("Temperature: " + fTemp5.toFixed(0) + "F");

    //Getting day5 humidity
    $("#hum5").text("Humidity: " + response.daily[5].humidity);
    //Getting day5 Wind
    $("#wind5").text("Windspeed: " + response.daily[5].wind_speed);
  });
}
function renderButtons() {
  $("#past-cities").empty();
  $(".container").hide();
  // Looping through the array of cities
  for (var i = 0; i < cities.length; i++) {
    var a = $("<button>");
    // Adding a class of city-btn to our button
    a.addClass("city-btn");
    // Adding a data-attribute
    a.attr("data-name", cities[i]);
    // Providing the initial button text
    a.text(cities[i]);
    // Adding the button to the buttons-view div
    $("#past-cities").append(a);
  }
}

$("#getWeather").on("click", function (event) {
 $()
  //buttons do not repeat itself
  event.preventDefault();
  //grabbing id of input
  var cityName = $("#city-search").val();
  cities.push(cityName);
  //calling function
  currentWeather(cityName);
  renderButtons();
  
 
});


$(document).on("click", ".city-btn", function () {
  var buttonCity = $(this).attr("data-name");
  currentWeather(buttonCity);
});

renderButtons();
});

