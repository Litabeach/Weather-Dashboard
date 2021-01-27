// pulls city buttons from local storage
var cities = JSON.parse(localStorage.getItem("cities")) || [];

var lastCity = JSON.parse(localStorage.getItem("last-city"));
if (lastCity) {
    showOneDay(lastCity);
    showFiveDay(lastCity);
}


// function that renders city buttons with class of city and data attribute "name", adds an on-click to run weather functions those buttons
function renderCities() {
    $("#cities-buttons").empty();
    $("#todayWeather").empty();
    $("#fiveDayWeather").empty();
    for (var i = 0; i < cities.length; i++) {
        var button = $("<button>");
        button.attr("class", "city");
        button.attr("data-name", cities[i]);
        button.text(cities[i]);
        button.click(function (event) {
            event.preventDefault()
            $("#todayWeather").empty();
            $("#fiveDayWeather").empty();
            $("h3").removeClass("hide");
            showOneDay($(this).attr("data-name"));
            showFiveDay($(this).attr("data-name"));
        });
        $("#cities-buttons").append(button);
    }
}

// function to show today's weather
function showOneDay(city) {
    // URL with API Key
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ec56ab5d5bd61e4c7ba5abb45ce5cb1a";

    $.ajax({
        url: queryURL,
        method: "GET",
        // throws an error message if they don't write in a city
        error: function(xhr, status, error){
            var errorMessage = xhr.status + ': ' + xhr.statusText
            alert('Error - ' + errorMessage);
            $("h3").addClass("hide");
        },
        success: function (response) {
            //traverse the weather object to select the appropiate items and set them to new variables
            var weatherCity = response.name;
            var weatherDate = new Date(response.dt * 1000).toString().substring(0, 15);
            var weatherIcon = "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
            var weatherTempK = response.main.temp;
            // convert Kelvin to Farenheit
            var weatherTempF = (weatherTempK - 273.15) * 1.80 + 32;
            //round the result
            var weatherTemp = Math.round(weatherTempF);
            var weatherHumidity = response.main.humidity;
            var weatherWindspeedk = response.wind.speed;
            //convert meters per second to miles per hour
            var weatherWindspeedm = weatherWindspeedk * 2.23694
            //round the result
            var weatherWindspeed = Math.round(weatherWindspeedm);
            // UV index pull lat and long
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            //An AJAX call to pull the UV index using the lat and lon from 50 and 51
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
                    weatherWindspeedEl.html("Windspeed: " + weatherWindspeed + " mph");

                    //UV index with conditional statement that changes the color of the appended box depending on UV #
                    var UVIndexEl = $("<p>");
                    UVIndexEl.html("UV Index: " + UVIndex);
                    if (UVIndex < 2) {
                        UVIndexEl.append($("<div class='box green'>"))
                    };
                    if (UVIndex >= 2 && UVIndex < 5) {
                        UVIndexEl.append($("<div class='box yellow'>"))
                    };
                    if (UVIndex >= 5 && UVIndex < 8) {
                        UVIndexEl.append($("<div class='box red'>"))
                    };
                    if (UVIndex >= 8) {
                        UVIndexEl.append($("<div class='box purple'>"))
                    };

                    oneDayDiv.append(weatherCityEl);
                    oneDayDiv.append(weatherDateEl);
                    oneDayDiv.append(weatherIconEl);
                    oneDayDiv.append(weatherTempEl);
                    oneDayDiv.append(weatherHumidityEl);
                    oneDayDiv.append(weatherWindspeedEl);
                    oneDayDiv.append(UVIndexEl);

                    $("#todayWeather").append(oneDayDiv);
                    // localStorage.setItem("lastCity", JSON.stringify(oneDayDiv))
                });
        }
    })
        ;

}

// function to show five day weather forecast
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
                    var date = forecast.list[i].dt_txt.substring(5, 10);   //substring 0, 10 chops the string at 10 characters so that time is not included
                    var icon = "http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png";
                    var tempK = forecast.list[i].main.temp;
                    var temp = (tempK - 273.15) * 1.80 + 32;
                    var tempF = Math.round(temp);
                    var humidity = forecast.list[i].main.humidity;
                    // create a div for them to live in
                    var fiveDayDiv = $("<div class='fiveDay col'>");
                    // create elements for them:
                    // date
                    var dateEl = $("<p>");
                    dateEl.html(date);

                    // icon
                    var iconEl = $("<img>");
                    iconEl.attr("src", icon);

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

// on-click  event that takes what the user has input into the #enter-city input div and
// then creates a button below the search for it.
$("#search").on("click", function (event) {
    event.preventDefault();
    var city = $("#enter-city").val().trim();
    if (city) {
        cities.push(city);
        renderCities();
        showOneDay(city);
        showFiveDay(city);
        $("h3").removeClass("hide");
        localStorage.setItem("cities", JSON.stringify(cities))
        localStorage.setItem("last-city", JSON.stringify(city))
    }

});
renderCities();




