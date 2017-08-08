// ====== BackGround Change Using day light saving
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
dayAndNight();//======background change end code


//POPULATE DATES IN "Choose Dates" DIV TAG
//BASED UPON CURRENT DATE WE WILL SHOW THE OPTIONS FOR TODAY, TOMORROW, AND DAY AFTER TO SEARCH FOR EVENTS
function formatDate(date) {
  var monthNames = [
    "Jan", "Feb", "Mar",
    "Apr", "May", "Jun", "Jul",
    "Aug", "Sep", "Oct",
    "Nov", "Dec"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();

  return day + 'th - ' + monthNames[monthIndex];
}

function updateChooseDate(){
  $("#today").html(formatDate(new Date()));
  var date = new Date(); 
  date.setDate(date.getDate() + 1); //HACK TO GET TOMORROW'S DATE
  //console.log(date);
  $("#tomorrow").html(formatDate(date));
  date.setDate(date.getDate() + 1); //HACK FOR GETTING DAY AFTER TOMORROW'S DATE
  //console.log(date);
  $("#dayafter").html(formatDate(date));
}
updateChooseDate();//FUNCTIONS TO UPDATE "Choose Dates" DIV ENDS HERE


//WEATHER API ADDED
var APIKey = "5e68d3fec5ccfb64ad77db9dcbc833c7";
var search = "";
var callBackResponse = "";
$("#submit-id").click(function(){
  event.preventDefault();
  //displays map 
  // var userInput = $('#search-bar').val();
  // var map = '<iframe class='embed-responsive-item' width="250" height="150" frameborder="0" style="border:0" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyDVZWMtxcCp39mek9w3shj-1r735OwHvak&q=' + userInput + '" allowfullscreen></iframe>';
  // $('#displayMap').html(map);
  getWeather();
  getEvents("paid");
});
//=====using weather api city getting events in that city
function getEvents(eventType){  
  var eventBriteAPIKey = "TGB23I7OLQWI6CGFUQ";
  var eventBriteToken = "JTGVPWWUXBDL7LEBSQYI";
  var eventBriteURL = "https://www.eventbriteapi.com/v3/events/search/?token=JTGVPWWUXBDL7LEBSQYI&q="+
                      $("#search-bar").val()+
                      //"Irvine, CA"+
                      "&price="+
                      eventType+
                      "&expand=venue&sort_by=distance";
  var eventsHTML = "";
  $.ajax({
    url: eventBriteURL,
    method: "GET",
    error: function (request, status, error) {
        alert(request.responseText);
    }
  }).done(function(response){
    // console.log(response.events[2]);
    for (var i=0; i < 10; i++) {
      // console.log(response.events[i].name.text); //Name of the Event
      // console.log(response.events[i].description.text); //Description of the Event
      // if(response.events[i].venue !== null) {
      //   console.log(response.events[i].venue.address.localized_multi_line_address_display); // Address of the Event
      // }
      // console.log(response.events[i].url); // URL for the Event
      var eventURL = response.events[i].url; // URL for the Event
      var eventName = response.events[i].name.text; // Name of the Event
      var eventDesc = response.events[i].description.text;
      var eventAddress = "No Address specified";
      if(response.events[i].venue !== null) {
        eventAddress = response.events[i].venue.address.localized_multi_line_address_display; // Address for the Event
      }
      eventsHTML += "<div id='eventLst'><span><a href='"+
                    eventURL+
                    "' title='"+
                    eventDesc+
                    "'>"+
                    eventName+
                    "</a><br>"+
                    "</span><span>"+
                    eventAddress+
                    "</span></div>";
    }
    $("#displayInfo").html(eventsHTML);
    $("#displayInfo").css('display','block');
  });
};
//using weather api key getting weather details
  function getWeather(){
    search = $("#search-bar").val();
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+search+"&units=imperial&appid=" + APIKey;
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
        $(".temp").html(response.main.temp+" &#x2109");
        
        /*
        * Code below is to set the sunrise & sunset time for the city selected for event search
        */
        var sunrise = response.sys.sunrise;
        var sunset = response.sys.sunset; 
        var date = new Date(sunrise*1000);
        var minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var formattedSunrise ="Sunrise " +  date.getHours() + ":" + minutes;
        $(".sunrise").html(formattedSunrise);
       
        date = new Date(sunset*1000);
        minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        var formattedSunset = "Sunset: " + date.getHours() + ":" + minutes;
        
        $(".sunset").html(formattedSunset);
        
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
