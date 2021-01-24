
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
        button.click(() => {
            showOneDay(cities[i]);
            // showFiveDay(cities[i])
        });
        $("#cities-buttons").append(button);
    }
}

function showOneDay(city) {
    // URL with API Key
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ec56ab5d5bd61e4c7ba5abb45ce5cb1a";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var weatherCity = response.name;
            var weatherDate = new Date(response.dt * 1000).toString();
            var weatherIcon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            // var weatherTemp = response.list.main.temp;
            // var weatherHumidity = response.list.main.humidity;
            // var weatherWindspeed = response.list.wind.speed;
            // var weatherUVIndex = response.???? will need to use lat and lon  response.city.coord.lat, .lon

            // one day weather div
            var oneDayDiv = $("<div class='oneDay'>");

            // city
            var weatherCityEl = $("<h3>");
            weatherCityEl.html(weatherCity);

            // date
            var weatherDateEl = $("<p>");
            weatherDateEl.html(weatherDate);

            // icon
            var weatherIconEl = $("<img>");
            weatherIconEl.attr("src", weatherIcon);
            

            // weatherCityEl.append(weatherIconEl);
            oneDayDiv.append(weatherCityEl);
            oneDayDiv.append(weatherDateEl);
            oneDayDiv.append(weatherIconEl);

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
    showOneDay(city);

    // on-click event that when used presses one of the created buttons, weather data is shown.
    // $(document).on("click", ".oneDay", showOneDay)
});

