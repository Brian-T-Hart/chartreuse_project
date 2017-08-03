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

dayAndNight();