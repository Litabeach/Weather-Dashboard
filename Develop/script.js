
inputDiv = $("enter-city")

var cities = [];

function renderCities(){
    $("#cities-buttons").empty();
    for (var i=0; i < cities.length; i ++){
        var button = $("<button>");
        button.attr("class", "city");
        button.attr("data-name", cities[i]);
        button.text(cities[i]);
        $("#cities-buttons").append(button)
        
    }
    
}


$("#search").on("click", function (event) {
    event.preventDefault();
    var city = $("#enter-city").val().trim();
    cities.push(city);
    renderCities();
});

