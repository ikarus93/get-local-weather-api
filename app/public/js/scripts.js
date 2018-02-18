function getLocation() {
  //function that get geoData from User
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition(callToServer);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function callToServer(location) {
    //Sends the location to backend and then parses response
    $.post("https://backend-jsonweather-atheos.c9users.io/weather", {data: location}, function(data) {
        handleWeatherData(data);
    })
}

function handleWeatherData(res) {
  res = JSON.parse(res);
  //Adds the returned data to the dom
      $(".output").append(
        $("<li></li>").text(res.name),
        $("<li></li>").text(res.weather[0].main),
        $("<li class='temp'></li>").text(Math.floor(res.main.temp) + " C°")
      );
      $("#icon").attr("src", res.weather[0].icon);
    
  
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
    num = Math.ceil((num - 32) *  5 / 9) + " C°";
  } else {
     num = Math.floor(num * 9 / 5 + 32) + " F°";
  }
  $(".temp").text(num);
}

$(function() {
  let val;
  getLocation();
        
        
$('button').click( function() {
  if (!($(this).hasClass("active"))) {       //check if button is active, if not convert the temperature value and change button appearance
      if ($(this).hasClass('celcius')) {
        val = convert(true);
      } else {
        val = convert(false);
      }
      toggleClass();
      $(".active").removeClass("active");
      $(this).addClass("active");
  }

})
});
