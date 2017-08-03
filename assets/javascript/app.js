function dayAndNight(){
    var current = new Date();
    var day_night = current.getHours();
        if (day_night < 12){
            //Day
            // var bodyImg = document.getElementsByTagName("Body")[0];
            document.body.style.backgroundImage = "url('assets/images/sunrise.jpg')";
        }
        else{
            //Night
            // var bodyImg = document.getElementsByTagName("Body")[0];
                document.body.style.backgroundImage = "url('assets/images/night.jpg')";
        }
}
dayAndNight();