$(document).ready( function() {

  //CHECK IF WE GET LOCATION.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var long = position.coords.longitude;
      $("#loc").text(lat);
      callWeather(lat,long);
    });
  }

  // GET WEATHER AND WORK ON IT.
  function callWeather(lat,long){
    var units = "imperial";
    var toggleTemp = true;
    var toggleSpeed = true;
    //lat = 28.7041;
    //long = 77.1025;
    var url = getUrl(lat,long,units);
    $.getJSON(url, function(data){
      $("#loc").html(data.name + ", " + data.sys.country);
      $(".temperature").text("temperature: " + data.main.temp+"\xB0 F");
      $(".windSpeed").text("wind speed: " + data.wind.speed + " mil/hr");
      $(".weather").text(data.weather[0].description);
      //var date = new Date(data.dt);
      //$(".weather").append(" " + date.toString());


      //TOGGLE TEMPERATURE UNITS WHEN CLICKED ON.
      $(".temperature").on('click',function(){
        if(toggleTemp===true){
          toggleTemp = false;
          var temp = ((data.main.temp -32) * 5/9).toFixed(2);
          $(".temperature").text("temperature: " + temp + "\xB0 C");
        }
        else if(toggleTemp===false){
          toggleTemp = true;
          $(".temperature").text("temperature: " + data.main.temp + "\xB0 F");
        }
      });

      //TOGGLE WIND SPEED UNIT
      $(".windSpeed").on('click', function(){
        if(toggleSpeed===true){
          toggleSpeed = false;
          var ws = (data.wind.speed * 0.44704).toFixed(2);
          $(".windSpeed").text("wind speed: " + ws + " m/sec");
        }
        else if(toggleSpeed===false){
          toggleSpeed = true;
          $(".windSpeed").text("wind speed: " + data.wind.speed + " mil/hr");
        }
      });


      var weatherType = data.weather[0].description;
      // SETTING BACKGROUND IMAGE ACC TO WEATHER.

      if(weatherType=="clear sky" || weatherType=="calm"){
        $("body").css({"backgroundImage": "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647030/resort-863129_wpglwb.jpg')","backgroundRepeat":"no-repeat"});
        $("a").css("color","black");
      }
      else if(weatherType=="scattered clouds" || weatherType== "few clouds"|| weatherType== "broken clouds" || weatherType== "overcast clouds") {
	      $("body").css({"background-image": "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647014/pigs-and-garden-011_jens92.jpg')"});
	      $("a").css("color","black");
      }
      else if(weatherType=="shower rain" ||  weatherType== "light intensity shower rain" || weatherType== "ragged shower rain"|| weatherType== "light rain"|| weatherType== "light intensity drizzle" || weatherType== "drizzle" || weatherType== "heavy intensity drizzle" || weatherType== "light intensity drizzle rain "|| weatherType== "drizzle rain" || weatherType== "heavy intensity drizzle rain" || weatherType== "shower rain and drizzle" ||  weatherType== "heavy shower rain and drizzle" ||  weatherType== "shower drizzle" || weatherType== "light intensity shower rain" || weatherType== "heavy intensity shower rain") {
	      $("body").css({"backgroundImage":"url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469646986/gif___running_through_the_rain_by_turst67-d6scius_asxoux.gif')","backgroundRepeat":"no-repeat"});
      }
      else if(weatherType=="very heavy rain" || weatherType== "moderate rain"|| weatherType== "heavy intensity rain" || weatherType== "very heavy rain" || weatherType== "extreme rain" || weatherType== "freezing rain" || weatherType== "heavy intensity shower rain") {
        $("body").css({"backgroundImage": "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647006/rain-758107_kyvspy.jpg')"});
      }
      else if(weatherType=="thunderstorm" || weatherType== "light thunderstorm" || weatherType== "heavy thunderstorm"|| weatherType== "ragged thunderstorm") {
        $("body").css("background-image","url('img/giphy (1).gif')");
        $("h1,h2").css("color","white");
      }
      else if(weatherType=="thunderstorm with rain" || weatherType== "thunderstorm with light rain" || weatherType== "thunderstorm with heavy rain" || weatherType==  "thunderstorm with light drizzle" || weatherType== "thunderstorm with drizzle" ||  weatherType== "thunderstorm with heavy drizzle") {
        $("body").css("background-image", "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469646977/giphy_1_p1slkg.gif')");
      }
      else if(weatherType=="snow" || weatherType== "light snow"|| weatherType== "heavy snow"|| weatherType== "sleet"|| weatherType== "shower sleet"|| weatherType== "light rain and snow"|| weatherType== "rain and snow"|| weatherType== "light shower snow"|| weatherType== "shower snow" || weatherType== "heavy shower snow") {
        $("body").css({"backgroundImage": "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469646981/crystals-335429_qyqld0.jpg')","backgroundRepeat":"no-repeat","backgroundPosition":"fixed center bottom no-repeat"});
        $("a").css({"color":"#161d24"});
      }
      else if(weatherType=="mist" || weatherType== "smoke" || weatherType==  "haze" || weatherType==  "sand,dust whirls"|| weatherType== "fog"|| weatherType== "sand"|| weatherType== "dust"|| weatherType==  "volcanic ash" || weatherType== "squalls") {
        $("body").css("background-image", "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469646986/mist_fcjita.jpg')");
      }
      else if(weatherType=="tornado" || weatherType== "tropical storm") {
        $("body").css("background-image", "url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647053/thunderstorm_an_puhyjg.gif')");
        $("h1").css("color","#f6f8f9");
      }
      else if(weatherType=="hurricane"|| weatherType== "severe gale" || weatherType== "violent storm"){
        $("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647516/hQ1nLwL_sygkaw.gif')");
        $("h1").css("color","#f6f8f9");
      }
      else if(weatherType=="hot"){
        $("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469738028/sunset-473345_lnjv67.jpg')");
        $("a").css("color","black");
      }
      else if(weatherType=="windy"){
        $("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647878/grass-354737_1920_jltzfa.jpg')")
        $("h1").css("color","#f6f8f9");
      }
      else if(weatherType=="light breeze") {
        $("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469647011/sunset-731307_uwwaah.jpg')")
        $("h1").css("color","black");
      }
      else if(weatherType=="fresh breeze" ||weatherType=="gentle breeze" ||weatherType=="moderate breeze") {
        $("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469646980/grass-520912_1920_rt31wy.jpg')")
        $("h1").css("color","#f6f8f9");
      }
      else{
        $("body").css("background-image","url('http://res.cloudinary.com/ddqhcwp8j/image/upload/v1469738291/clouds-1194912_e80cqb.jpg')","backgroundRepeat","no-repeat","backgroundPosition","fixed center bottom no-repeat");
      }
    });
  }

  function getUrl(lat,long,units){
    console.log(lat);
    var appid = "20cdc559fd42259875acefff4fa7452c";
    var weatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=" + units + "&APPID=" + appid;
    console.log(weatherURL);
    return weatherURL;
    //https://crossorigin.me/
  }
});
