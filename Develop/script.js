
// inputDiv = $("enter-city")
var cities = [];

// function that renders city buttons with class of city and data attribute "name"
function renderCities() {
    $("#cities-buttons").empty();
    $("#todayWeather").empty();
    $("#fiveDayWeather").empty();
    for (var i = 0; i < cities.length; i++) {
        var button = $("<button>");
        button.attr("class", "city");
        button.attr("data-name", cities[i]);
        button.text(cities[i]);
        button.click(() => {
            showOneDay(cities[i]);
            showFiveDay(cities[i])
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
            // UV index pull lat and long
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var queryURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=ec56ab5d5bd61e4c7ba5abb45ce5cb1a";

                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                    .then(function (UVresponse) {
                        var UVIndex = UVresponse.value

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

            //UV index

            // if (currentHour == timeBlock.dataHour) {
            // $(inputDiv).attr("class", "present col-10")

            var UVIndexEl = $("<p>");
            UVIndexEl.html("UV Index: " + UVIndex);
            if (UVIndex < 2){
                UVIndexEl.addClass("box green")
            };
            if (UVIndex >= 2 && UVIndex < 5){
                UVIndexEl.addClass("box yellow")
            };
            if (UVIndex >= 5){
                UVIndexEl.addClass("box red")
            };

            oneDayDiv.append(weatherCityEl);
            oneDayDiv.append(weatherDateEl);
            oneDayDiv.append(weatherIconEl);
            oneDayDiv.append(weatherTempEl);
            oneDayDiv.append(weatherHumidityEl);
            oneDayDiv.append(weatherWindspeedEl);
            oneDayDiv.append(UVIndexEl);

            $("#todayWeather").append(oneDayDiv);
        });
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
            //function that runs through the list of items in the forecast
            for (var i = 0; i < forecast.cnt; i++) {
                var forecastResponse = forecast.list[i];
                var responseDate = moment(forecastResponse.dt_txt);
                // checks to see if it is noon, if it is, get these data:
                if (parseInt(responseDate.format("HH")) == 12) {
                    var date = forecast.list[i].dt_txt;
                    var icon = "http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png";
                    var tempK = forecast.list[i].main.temp;
                    var temp = (tempK - 273.15) * 1.80 + 32;
                    var tempF = Math.round(temp);
                    var humidity = forecast.list[i].main.humidity;
                    // create a div for them to live in
                    var fiveDayDiv = $("<div class='fiveDay'>");
                    // create elements for them:
                    // date
                    var dateEl = $("<p>");
                    dateEl.html(date);

                    // icon
                    var iconEl = $("<img>");
                    iconEl.attr("src", icon);

                    console.log(iconEl)

                    // temp
                    var tempEl = $("<p>");
                    tempEl.html("Temp: " + tempF + "°F");

                    // humidity
                    var humidityEl = $("<p>");
                    humidityEl.html("Humidity: " + humidity + "%");

                    // add them to the page
                    fiveDayDiv.append(dateEl);
                    fiveDayDiv.append(iconEl);
                    fiveDayDiv.append(tempEl);
                    fiveDayDiv.append(humidityEl);

                    $("#fiveDayWeather").append(fiveDayDiv);



                }

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

