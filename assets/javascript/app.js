//======== Change Background Color =======//

function dayAndNight(){

  var current = new Date();
  var day_night = current.getHours();

    if (day_night < 19){
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

//======== On Click Event =======//

//===== Embed Map =====//

$("#submit-id").click(function(){
  event.preventDefault();
  var userInput = $('#search-bar').val();
  var map = '<iframe width="600" height="450" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDVZWMtxcCp39mek9w3shj-1r735OwHvak&q=' + userInput + '" allowfullscreen></iframe>';
  $('#map').html(map);

  getWeather();
})

//===== Weather API =====//

  function getWeather(){
    var userInput = $('#search-bar').val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+ userInput +"&units=imperial&appid=" + APIKey;
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
        $(".country").html("Country: " + response.sys.country);
        $(".humidity").html("Humidity: " + response.main.humidity + " %");
        $(".temp").html("Temperature: " + response.main.temp + " &#x2109");
        $(".skies").html("Skies: " + response.weather[0].description);
        // Console logging the the return
        console.log("City: " + response.name);
        console.log("Country: " + response.sys.country);
        console.log("Current Humidity:" + response.main.humidity + " %");
        console.log("Current Temperature: " + response.main.temp + " &#x2109");
        console.log("Skies: " + response.weather[0].description);
        cbHandler(response);
      });
  }
  function cbHandler(weatherDetails){
    callBackResponse = weatherDetails;
  }

  //===== Event API Section =====//

    $("#submit-id").on("click", function eventSearch() {

      //Getting the location info from search bar
      var userInput = $('#search-bar').val();
      console.log("location in the search bar: " + userInput);

      // Storing our Eventbrite API URL
      var queryURL = "https://www.eventbriteapi.com/v3/events/search/?token=JTGVPWWUXBDL7LEBSQYI&q=" + userInput + "&sort_by=best";

      console.log(queryURL);

      // Perfoming an AJAX GET request to our queryURL
      $.ajax({
      url: queryURL,
      method: "GET"
      })

      // After the data from the AJAX request comes back
      .done(function(response) {
        var result = response.events;
      console.log(result);
      console.log(result[0].name.text);
      console.log(result[0].start.local);
      console.log(result[0].description.html);
      console.log(result[0].url);

      // Change HTML file
      // $("#article-events").prepend("<h1> JSON response: </h1>" + JSON.stringify(result));

      $("#dynamic-code").append("<h2> " + result[0].name.text + "</h2>");
      $("#dynamic-code").append("<h5>Start Time: " + result[0].start.local + "</h5>");
      // $("#article-events").append("<p>" + result[0].description.html + "</p>");
      
      });

      //===For Loop for Displaying Event List ===//

    //   eventList = [];

    //   function displayEventList() {

    //     // Deleting the animal buttons prior to adding new animal buttons
    //     // (this is necessary otherwise we will have repeat buttons)
    //     $("#event-list-container").empty();

    // Example:
    //     //Try using a loop that appends a button for each string in the array.
    //     // Looping through the array of itmes
    //     for (var i = 0; i < eventList.length; i++) {

    //       // Then dynamicaly generating buttons for each item in the array.
    //       // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    //       var a = $("<button>");
    //       // Adding a class
    //       a.addClass("list-card");
    //       // Adding button type
    //       a.attr("type", "button");
    //       // Adding a data-attribute with a value of the animal at index i
    //       a.attr("data-input", eventList[i]);
    //       // Providing the button's text with a value of the animal at index i
    //       a.text(eventList[i]);
    //       // Adding the button to the HTML
    //       $("#buttons").append(a);
    //     }
    //   }

    //     //Calling the function
    //     displayEventList();

    });

  //=====End of Event API Section=====//