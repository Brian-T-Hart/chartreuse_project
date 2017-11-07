// ====== BackGround Change Using day light saving
function dayAndNight(){

  var current = new Date();
  var day_night = current.getHours();
  // console.log(current);
  // console.log(day_night);

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
  displayOnMap(userInput); //DISPLAY THE SELECTED CITY ON THE MAP
});

//using weather api key getting weather details
  function getWeather(){
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q="+userInput+"&units=imperial&appid=" + APIKey;
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
        $(".city").html( response.name + ', ');
        $(".country").html(response.sys.country);
        $(".humidity").html("Humidity: " + response.main.humidity+" %");
        $(".temp").html(Math.round(response.main.temp)+" &#x2109");


        var sunrise = response.sys.sunrise;
        var x = moment(sunrise*1000).format('h:mm A');
        var sunset = response.sys.sunset;
        var y = moment(sunset*1000).format('h:mm A');

        $(".sunrise").html('Sunrise ' + x);
        $(".sunset").html(' Sunset ' + y);

      var lat = response.coord.lat;
      //console.log(lat);
      var lng = response.coord.lon;
      // console.log(long);
      var api_key = "G1LHK198LBCB";
      queryURLTime = "https://vip.timezonedb.com/v2/get-time-zone?key="+ api_key + "&format=json&by=position&lng=" + lng + "&lat=" + lat;
        console.log(queryURLTime);
        $.ajax({
           url: queryURLTime,
           method: "GET"
        }).done(function(response) {
          console.log(response);
        //appends the country name to the html
        $('.localTime').html(moment(response.formatted).format("hh:mm A") + ' - ');
        });

        cbHandler(response);
      });
  }

  function cbHandler(weatherDetails){
    callBackResponse = weatherDetails;
  }

// clock function
(function () {
  var clockElement = document.getElementById("clock");
  function updateClock(clock) {
    clock.innerHTML = new Date().toLocaleTimeString();
  }
  setInterval(function() {
      updateClock(clockElement);
  }, 1000);
}());
