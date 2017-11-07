
var eventType = "music";
var address;
var dateRange = "2017080100-2017103000";
var noOfRecords = 10;

//CREATE AN EVENT OBJECT TO CAPTURE THE  EVENT RELATED INFORMAION

var event = {
   title:"",
   description:"",
   url:"",
   imgSrc:"",
   city:"",
   country:"",
   venue_name:"",
   venue_address:"",
   venue_url:"",
   start_time:""
};

//ARRAY OF EVENTS
var events = [];

// FUNCTION TO DISPLAY EVENTS FOR A GIVEN CITY NAME
function queryEvents(eventType, address, noOfRecords, dateRange)
{
   var oArgs = {
      app_key: "Gp5KnQs4HTZ9gpPJ", //APP KEY FOR USING "EVENTFUL" API
      q: eventType, //SEARCH ON THE TYPE OF EVENT e.g, MUSIC, FAMILY, BUSINESS
      where: address, //THIS COULD BE CITY NAME OR ADDRESS
      "date": dateRange, //"2017080100-2017103000"
      page_size: noOfRecords, //NO. OF RECORDS TO FETCH FROM THE QUERY
      sort_order: "popularity", //SORTING RELEVANCE
   };

   EVDB.API.call("/events/search", oArgs, function(oData) {
      var cloneEvent;
      for (var i=0; i<oData.events.event.length; i++){

         event.title = oData.events.event[i].title;
         event.description = oData.events.event[i].description;
         event.url = oData.events.event[i].url;
         if(oData.events.event[i].image !== null){
            event.imgSrc = oData.events.event[i].image.medium.url;
         }
         event.city = oData.events.event[i].city_name;
         event.country = oData.events.event[i].country_name;
         event.venue_name = oData.events.event[i].venue_name;
         event.venue_address = oData.events.event[i].venue_address;
         event.venue_url = oData.events.event[i].venue_url;
         event.start_time = oData.events.event[i].start_time;
         event.url = oData.events.event[i].url;

         // NEED TO CLONE THE EVENT OBJECT SINCE OBJECTS ARE PASSED BY REFERNCE
         cloneEvent = Object.assign({}, event);
         events.push(cloneEvent);
         createEventDiv(cloneEvent);
      }
   });
}

function createEventDiv(event){
   var eventDIV = "<div class = 'row eventList'><div><a href='"+
                     event.url+
                     "'><img id ='eventImage' class= 'img-thumbnail project' src='"+
                     event.imgSrc+
                     "'alt='"+
                     "'></a></div><div><span class='title'>"+
                     "<h4>" +
                     event.title+
                     "</h4></span>"+
                     "<a class='link' href='#' onclick='displayAddressOnMap(this);return false;' data-info='"+
                     event.venue_address+
                     "'>"+
                     event.venue_address+
                     "</a></span><br><span>"+
                     event.city+","+event.country+
                     "</span><br><span>" +
                     "<a class='link' href='"+
                     event.venue_url+
                     "'>"+event.venue_name+"</a></span><br><span>"+
                     event.start_time+"</span><br>" +
                      "</div></div></div>";
            var eventsHolder = $('#eventsDisplay');
            eventsHolder.append(eventDIV);

}

//TO DISPLAY THE SELECTED EVENT ADDRESS ON THE ADJACENT MAP
function displayAddressOnMap(item){
   displayOnMap(item.getAttribute('data-info'));
   //console.log(item.getAttribute('data-info'));
}

//CALLABLE FUNCTION FROM UI BASED UPON THE EVENT TYPE
function getEventsToUI(eventType){
   $("#eventsDisplay").empty();
   address = $("#search-bar").val();
   if((address === null) || (address === "")) {
      address = "Irvine, CA"; //SETTING DEFAULT CITY NAME IF NO CITY NAME SPECIFIED FROM UI
   }
   queryEvents(eventType, address, noOfRecords, dateRange);
}
