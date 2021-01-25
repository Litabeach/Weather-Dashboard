
// inputDiv = $("enter-city")
var cities = [];

// function that renders city buttons with class of city and data attribute "name"
function renderCities() {
    $("#cities-buttons").empty();
    $("#todayWeather").empty();
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

            console.log(response);
            var weatherCity = response.name;
            var weatherDate = new Date(response.dt * 1000).toString();
            var weatherIcon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var weatherTempK = response.main.temp;
            var weatherTempF = (weatherTempK - 273.15) * 1.80 + 32;
            var weatherTemp = Math.round(weatherTempF);
            var weatherHumidity = response.main.humidity;
            var weatherWindspeed = response.wind.speed;
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

            // temp
            var weatherTempEl = $("<p>");
            weatherTempEl.html("Temp: " + weatherTemp + "°F");

            // humidity
            var weatherHumidityEl = $("<p>");
            weatherHumidityEl.html("Humidity: " + weatherHumidity + "%");

            // windspeed
            var weatherWindspeedEl = $("<p>");
            weatherWindspeedEl.html("Windspeed: " + weatherWindspeed + "kph");

            oneDayDiv.append(weatherCityEl);
            oneDayDiv.append(weatherDateEl);
            oneDayDiv.append(weatherIconEl);
            oneDayDiv.append(weatherTempEl);
            oneDayDiv.append(weatherHumidityEl);
            oneDayDiv.append(weatherWindspeedEl);

            $("#todayWeather").append(oneDayDiv);
        });

}

function showFiveDay(city) {
    // URL with API Key
    var queryURL5 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=ec56ab5d5bd61e4c7ba5abb45ce5cb1a";

    $.ajax({
        url: queryURL5,
        method: "GET"
    })
        .then(function (forecast) {
            console.log(forecast);
            
            for (var i = 0; i < forecast.cnt; i++) {
                var forecastResponse = forecast.list[i];
                // console.log(forecastResponse);
                // console.log(i);
                var responseDate = moment(forecastResponse.dt_txt);
                console.log(responseDate)
        }
                if (parseInt(responseDate.format("HH")) == 12) {

                   alert("hello!")
    
                    }

                });

}


// function showFiveDay(city) {
//     var queryURL5 = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=ec56ab5d5bd61e4c7ba5abb45ce5cb1a";

//     $.ajax({
//         url: queryURL5,
//         method: "GET"
//     })
//         .then(function (forecast) {
//             console.log(forecast);
//             for (var i = 0; i < forecast.cnt; i ++) {
//                 var forecastResponse = forecast.list[i]
//                 // console.log(forecastResponse);
//                 // console.log(i);
//                 var responseDate = moment(forecastResponse.dt_txt);
//                 if (parseInt(responseDate.format("HH")) == 12){

//                  $("#5dayWeather).append(fiveDayDiv);

//                 }
//         });

// }



// on-click  event that takes what the user has input into the #enter-city and
// then creates a button below the search for it.
$("#search").on("click", function (event) {
    event.preventDefault();
    var city = $("#enter-city").val().trim();
    cities.push(city);
    renderCities();
    showOneDay(city);
    showFiveDay(city);

    // on-click event that when used presses one of the created buttons, weather data is shown.
    // $(document).on("click", ".city", showOneDay)
});

