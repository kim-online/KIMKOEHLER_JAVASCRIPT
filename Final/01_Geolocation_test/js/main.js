/* Your code starts here */

var app = app || {};

app.main = (function() {
	console.log('Your code starts here!');

var x = document.getElementById("demo");
var _time = 0;

	function getLocation() {
		console.log('Initializing geo.');
    	if (navigator.geolocation) {
        	navigator.geolocation.watchPosition(showPosition);
    	} else {
        	x.innerHTML = "<p>Geolocation is not supported by this browser.</p>";
    	}
	}

	function showPosition(position) {
		console.log('Initializing Position.');
    	x.innerHTML = "<p>Latitude: " + position.coords.latitude + 
    	"<br>Longitude: " + position.coords.longitude +
    	"<br>Accuracy: " + position.coords.accuracy + 
    	"<br>Heading: " + position.coords.heading + 
    	"Timestamp: " + position.timestamp + "</p>";
    	
	}

	/*function checkTime(time) {
		console.log("Time: " + time);
		console.log("LastTime" + _time);
		if (time > _time){
		getLocation();
		_time = time;
		}

	}*/
	

	var init = function(){
		console.log('Initializing app.');
		getLocation();
		
	};

	return {
		init: init
	};

})();

window.addEventListener('DOMContentLoaded', app.main.init);