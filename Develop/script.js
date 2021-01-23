
// inputDiv = $("enter-city")
var cities = [];

// function that renders city buttons with class of city and data attribute "name"
function renderCities() {
    $("#cities-buttons").empty();
    for (var i = 0; i < cities.length; i++) {
        var button = $("<button>");
        button.attr("class", "city");
        button.attr("data-name", cities[i]);
        button.text(cities[i]);
        $("#cities-buttons").append(button)
    }
}

function showOneDay() {
    var thisButton = $(this);
    //var thisMovieName = thisButton.attr("data-name");
    var thisCityName = thisButton.attr("data-name");

    // URL with API Key
    var queryURL = "api.openweathermap.org/data/2.5/forecast?q=" + thisCityName + "&appid=ec56ab5d5bd61e4c7ba5abb45ce5cb1a";
  

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            //   in here will be the info we want to pull about weather data
            console.log(response)
            var weatherCity = response.city.name;
            var weatherDate = response.list.dt_txt;
            var weatherIcon = response.list.weather.icon;
            // var weatherTemp = response.list.main.temp;
            // var weatherHumidity = response.list.main.humidity;
            // var weatherWindspeed = response.list.wind.speed;
            // var weatherUVIndex = response.???? will need to use lat and lon  response.city.coord.lat, .lon
            
            // one day weather div
            var oneDayDiv = $("<div class='oneDay'>");

            // city
            var weatherCityEl = $("<h3>");
            oneCityEl.html(weatherCity);

            // date
            var weatherDateEl = $("<p>");
            weatherDateEl.html(weatherDate);

            // icon
            var weatherIconEl = $("<img>");
            weatherIcon.attr("src", weatherIcon);

            weatherCityEl.append(weatherDateEl);
            weatherCityEl.append(weatherIconEl);
        
            $("#todayWeather").append(oneDayDiv);
        });

}

// on-click  event that takes what the user has input into the #enter-city and
// then creates a button below the search for it.
$("#search").on("click", function (event) {
    event.preventDefault();
    var city = $("#enter-city").val().trim();
    cities.push(city);
    renderCities();
    showOneDay();

// on-click event that when used presses one of the created buttons, weather data is shown.
$(document).on("click", ".oneDay", showOneDay)
});

