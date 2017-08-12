// ====== BackGround Change Using day light saving
function dayAndNight(){

  var current = new Date();
  var day_night = current.getHours();
  console.log(current);
  console.log(day_night);

    if (day_night > 6 && day_night < 19){
      //Day
      document.body.style.backgroundImage = "url('assets/images/sunrise.jpg')";
    }
    else{
      //Night
        document.body.style.backgroundImage = "url('assets/images/night.jpg')";
    }
}
dayAndNight();//======background change end code

//WEATHER API ADDED
var APIKey = "5e68d3fec5ccfb64ad77db9dcbc833c7";
var search = "";
var callBackResponse = "";
var userInput;

$('#displayPanel').hide();

$("#submit-id").click(function(){
  event.preventDefault();
  userInput = $('#search-bar').val();
  getWeather(); //GETS WEATHER FOR THE SEARCH CITY
  getEventsToUI('music'); //DEFAULT CITY SEARCH WOULD DISPLAY MUSIC EVENTS
  displayOnMap(); //DISPLAY THE SELECTED CITY ON THE MAP
});

//using weather api key getting weather details
  function getWeather(){
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+userInput+"&units=imperial&appid=" + APIKey;
    //console.log(queryURL);
    var iconImg;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {
        // Transfer content to HTML
        $(".city").html( response.name);
        $(".country").html(response.sys.country);
        $(".humidity").html("Humidity: " + response.main.humidity+" %");
        $(".temp").html(Math.round(response.main.temp)+" &#x2109");

        /*
        * Code below is to set the sunrise & sunset time for the city selected for event search
        */
        var sunrise = response.sys.sunrise;
        var x = moment(sunrise*1000).format('h:mm A');
        var sunset = response.sys.sunset;
        var y = moment(sunset*1000).format('h:mm A');
        // var date = new Date(sunrise*1000);
        // var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        // var formattedSunrise ="Sunrise " +  date.getHours() + ":" + minutes;
        $(".sunrise").html('Sunrise ' + x);


        // date = new Date(sunset*1000);
        // minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        // var formattedSunset = "Sunset: " + date.getHours() + ":" + minutes;

        $(".sunset").html(' Sunset ' + y);

        // Below lines of code show the icon for "skies". For now we have commented this code.
        // iconImg = response.weather[0].icon;
        // $(".iconImage").attr("src", "http://openweathermap.org/img/w/"+iconImg+".png");
        // $(".iconImage").attr("alt", response.weather[0].description);


        cbHandler(response);
      });
  }

  function cbHandler(weatherDetails){
    callBackResponse = weatherDetails;
  }

//Displays the Map section
// function initMap() {
//   //var mapsAPIKey = "AIzaSyDTgS4kfcZbPUE8-L8Adah8y2AlOPkTwHM"; //API Key for Google Maps Javascript API
//   var latlng = {lat: -25.363, lng: 131.044};
//   var map = new google.maps.Map(document.getElementById('#displayMap'), {
//     zoom: 4,
//     center: latlng
//   });
//   var marker = new google.maps.Marker({
//     position: latlng,
//     map: map
//   });
// }
