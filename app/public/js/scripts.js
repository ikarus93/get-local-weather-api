const icons = {
    //Holds html reference to the different possible weather icons
    "Clouds": `<div class="icon cloudy">
                          <div class="cloud"></div>
                          <div class="cloud"></div>
                          </div>`,
    "Thunderstorm": `<div class="icon thunder-storm">
                                <div class="cloud"></div>
                                <div class="lightning">
                                <div class="bolt"></div>
                                <div class="bolt"></div>
                                </div>
                                </div>`,
    "Drizzle": `<div class="icon sun-shower">
                          <div class="cloud"></div>
                          <div class="sun">
                          <div class="rays"></div>
                          </div>
                          <div class="rain"></div>
                          </div>`,
    "Rain": `<div class="icon rainy">
                          <div class="cloud"></div>
                          <div class="rain"></div>
                          </div>`,
    "Snow": `<div class="icon flurries">
                          <div class="cloud"></div>
                          <div class="snow">
                          <div class="flake"></div>
                          <div class="flake"></div>
                          </div>
                          </div>`,
    "Clear": `<div class="icon sunny">
                          <div class="sun">
                          <div class="rays"></div>
                          </div>
                          </div>`
}

function getLocation() {
    //function that gets geoData from User, if user doesnt permit HTML-geolocation API, slideDown city-select panel
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(callToServer);
    } else {
        alert("Couldnt load your Geodata. Please tell us your city")
        $(".city-select").slideDown();
    }
}



function callToServer(location, city) {
    //Sends the location to backend and then passes response to handler
    
    $.post("https://backend-jsonweather-atheos.c9users.io/weather", {
        data: {
            loc: location,
            geo: location != null,
            city: city || undefined
        }
    }, function(data) {
        if (data === 404) alert("Content could not be found. Please try reloading the page!")
        handleWeatherData(data);
    })
}

function selectIcon(weather) {
    //Selects the icon class to load based on the current weather
    return icons[weather];
}

function buttonLogic(btn) {
    if (!($(btn).hasClass("active"))) { //check if button is active, if not convert the temperature value and change button appearance
        if ($(btn).hasClass('celcius')) {
            val = convert(true);
        } else {
            val = convert(false);
        }
    }
    toggleClass();
    $(".active").removeClass("active");
    $(btn).addClass("active");
}

function handleWeatherData(res) {
    //delete all previous weather interface 
    $(".output").empty();
    $("#icon").empty();
    res = JSON.parse(res);
    //Adds the returned data to the dom
    $(".output").append(
        $("<li></li>").text(res.name),
        $("<li></li>").text(res.weather[0].main),
        $("<li class='temp'></li>").text(Math.floor(res.main.temp) + " C°")
    );
    $("#icon").append(selectIcon(res.weather[0].main))


}

function toggleClass() {
    //Function that helps toggle the celcius/fahrenheit button classes on click respectively
    $(".celcius").toggleClass('btn-primary').toggleClass('btn-secondary');
    $(".fahrenheit").toggleClass('btn-secondary').toggleClass('btn-primary');
}

function convert(toCelcius) {
    //converts fahrenheit to celcius and vice-versa
    num = Math.floor(parseInt($(".temp").text()));
    if (toCelcius) {
        num = Math.ceil((num - 32) * 5 / 9) + " C°";
    } else {
        num = Math.floor(num * 9 / 5 + 32) + " F°";
    }
    $(".temp").text(num);
}

$(function() {
    let val;
    getLocation();


    //Handlers for Cityselection
    $(".city-select").hide() //by default
    $(".city-submit").click(function() {
        callToServer(null, $("#city").val())
        $(".city-select").slideUp();
    })

    $(".search-by-city").click(function() {
        $(".city-select").slideDown();
        
    })

    $('.temp-btn').click(function() {
        buttonLogic(this);

    })
});