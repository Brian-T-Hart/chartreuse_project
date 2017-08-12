var geocoder, map, marker, cityLocation, cityName; 
function displayOnMap(){
	cityName = $("#search-bar").val();
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
							icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
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

//CALLBACK FUNCTION FOR THE GOOGLE MAPS API. THIS WILL ASK IF MAPS CAN ACCESS CURRENT LOCATION AND DISPLAY ON MAP
function initMap() {
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
				icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
			});
		});
	} else{
		pos = {
			lat: -34.397, 
			lng: 150.644
		};
		map = new google.maps.Map(document.getElementById('mapDisplay'),{
			zoom: 10,
			center: {lat: -34.397, lng: 150.644}
		});
		marker = new google.maps.Marker({
			position: pos,
			map: map,
			animation: google.maps.Animation.DROP,
			icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
		});
	}
}

//FUNCTION FOR AUTO-COMPLETE IN THE SEARCH TEXT BOX MAPPED TO PLACES USING GOOGLE MAPS API
function autocomplete(){
	var autocomplete = new google.maps.places.Autocomplete((document.getElementById('search-bar')),
               {types:['geocode']});
}

function searchNearBy(searchType){
	var service = new google.maps.places.PlacesService(map);
	service.nearbySearch({
		radius: '500',
		type: [searchType],
		location: cityLocation
	}, callback);
}

function callback(results, status){
	if(status === google.maps.places.PlacesServiceStatus.OK){
		for(var i=0; i<results.length; i++){
			createMarker(results[i]);
		}
	}
}

function createMarker(place){
	var location = place.geometry.location;
	var serviceMarker = new google.maps.Marker({
		map:map,
		position: location,
		icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
	});
	google.maps.event.addListener(serviceMarker, 'click', function(){
		marker.setTitle(place.name);
		map.setZoom(11);
	});
}