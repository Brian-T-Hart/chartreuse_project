var geocoder, map, marker, cityLocation, cityName;
function displayOnMap(cityName){
	$("#mapDisplay").css("display", "block");
	if(typeof(map) === "undefined"){
		var pos = {
			lat: 0,
			lng: 0
		};
		map = new google.maps.Map(document.getElementById('mapDisplay'),{
			zoom: 10,
			center: pos
		});
	};

	if(typeof(marker) !== "undefined"){
		marker.setMap(null);
	};

	if((cityName !== null) || (cityName !== "")){
		geocoder = new google.maps.Geocoder();
		if(geocoder){
			geocoder.geocode({"address":cityName}, function(results, status){
				if(status === google.maps.GeocoderStatus.OK){
					if(status !== google.maps.GeocoderStatus.ZERO_RESULTS){
						map.setCenter(results[0].geometry.location);
						cityLocation = results[0].geometry.location;
						marker = new google.maps.Marker({
							position: cityLocation,
							map: map,
							title: cityName,
							animation: google.maps.Animation.DROP,
							icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
						});
					} else{
						console.log("No results found");
					}
				} else{
					console.log("Geocode was not successful for the following reason " + status);
				}
			});
		}
	}
}

//BLANK INITMAP function
function initMap() {

}

//CALLBACK FUNCTION FOR THE GOOGLE MAPS API. THIS WILL ASK IF MAPS CAN ACCESS CURRENT LOCATION AND DISPLAY ON MAP
function initMap1() {
	var pos;
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(function(position){
			pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};
			map = new google.maps.Map(document.getElementById('mapDisplay'),{
				zoom: 10,
				center: pos
			});
			marker = new google.maps.Marker({
				position: pos,
				map: map,
				animation: google.maps.Animation.DROP,
				icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
			});

			var options = {
				'default':'',
				'restaurant':'Restaurants',
				'atm':'ATM',
				'hospital':'Hospitals',
				'pharmacy': 'Pharmacy',
				'gas-station':'Gas Stations'};
			var searchNearBy = document.createElement("SELECT");
			searchNearBy.id = "searchNearBy";
			searchNearBy.onchange = function(){
				//console.log(this.value);
				fnSearchNearBy(this.value, pos);
			};
			var keys = Object.keys(options);
			for (var i=0; i<keys.length; i++){
				var option = document.createElement("OPTION");
				var key = keys[i];
				option.value = key;
				option.innerHTML = options[key];
				searchNearBy.appendChild(option)
			}

			map.controls[google.maps.ControlPosition.TOP_RIGHT].push(searchNearBy);
		});
	}
}

//FUNCTION FOR AUTO-COMPLETE IN THE SEARCH TEXT BOX MAPPED TO PLACES USING GOOGLE MAPS API
function autocomplete(){
	var autocomplete = new google.maps.places.Autocomplete((document.getElementById('search-bar')),
               {types:['geocode']});
}

//
function fnSearchNearBy(searchType, pos){
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		radius: '2000',
		type: [searchType],
		location: pos
	}, function (results, status){
		if(status === google.maps.places.PlacesServiceStatus.OK){
			for(var i=0; i<results.length; i++){
				createMarker(results[i], searchType);
			}
		}
	}
)};


function createMarker(place, searchType){
	var location = place.geometry.location;
	var icon;
	if(searchType === 'restaurant'){
		icon = 'https://maps.google.com/mapfiles/kml/pal2/icon55.png';
	} else if(searchType === 'atm'){
		icon = 'https://maps.google.com/mapfiles/kml/pal2/icon50.png';
	} else if(searchType === 'hospital'){
		icon = 'https://maps.google.com/mapfiles/kml/pal3/icon38.png';
	} else if(searchType === 'pharmacy'){
		icon = 'https://maps.google.com/mapfiles/kml/pal2/icon1.png';
	} else if(searchType === 'gas-station'){
		icon = 'https://maps.google.com/mapfiles/kml/pal2/icon29.png';
	}
	var serviceMarker = new google.maps.Marker({
		map:map,
		position: location,
		title: place.name,
		icon: icon
	});
	map.setZoom(12);
	google.maps.event.addListener(serviceMarker, 'click', function(){
		marker.setTitle(place.name);
	});
}
