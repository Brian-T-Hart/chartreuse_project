function dayAndNight(){

  var current = new Date();
  var day_night = current.getHours();

    if (day_night < 12){
      //Day
      
      document.body.style.backgroundImage = "url('assets/images/sunrise.jpg')";
    }
    else{
      //Night
      
        document.body.style.backgroundImage = "url('assets/images/night.jpg')";
    }
}
dayAndNight();
var APIKey = "5e68d3fec5ccfb64ad77db9dcbc833c7";
var search = "";
var callBackResponse = "";
$("#submit-id").click(function(){
  event.preventDefault();
  
  var userInput = $('#search-bar').val();
  var map = '<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDVZWMtxcCp39mek9w3shj-1r735OwHvak&q=' + userInput + '" allowfullscreen></iframe>';
  $('#map').html(map);

  getWeather();
})
  function getWeather(){
    search = $("#search-bar").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+search+"&units=imperial&appid=" + APIKey;
    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // We store all of the retrieved data inside of an object called "response"
      .done(function(response) {
        //callBackResponse = response;
        // Log the queryURL
        console.log(queryURL);
        // Log the resulting object
        console.log(response);
        // Transfer content to HTML
        $(".city").html("City: " + response.name);
        $(".country").html("Country: "+response.sys.country);
        $(".humidity").html("Humidity: "+response.main.humidity+" %");
        $(".temp").html("Temperature: "+response.main.temp+" &#x2109");
        $(".skies").html("Skies: "+response.weather[0].description);
        // Console logging the the return
        console.log("City: " + response.name);
        console.log("Country: "+response.sys.country);
        console.log("Current Humidity:" + response.main.humidity+" %");
        console.log("Current Temperature: " + response.main.temp+" &#x2109");
        console.log("Skies: "+response.weather[0].description);
        cbHandler(response);
      });
  }
  function cbHandler(weatherDetails){
    callBackResponse = weatherDetails;
  }