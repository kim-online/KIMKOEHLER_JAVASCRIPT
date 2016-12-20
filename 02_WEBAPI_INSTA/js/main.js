
//console.log('before bool outside: '+bool);
//var bool = false;
//console.log('after bool outside: '+bool);

//Check if App is running somewhere else

var app = app || {};

//Access token from Instagram Api
var clientID = '42dd8f8d8aad499eb9e5748dcd1faa0b';

//Direct the user to this adress after Instagram authorization
var redirectURI = 'http://192.168.0.2:8000';

//When page load, send user to authorize Instagram account
//if (bool === false){
$(window).ready(function(){	
	$.ajax(
	//$(window).ready(function(){
		$(location).attr('href', 'https://api.instagram.com/oauth/authorize/?client_id='+clientID+'&redirect_uri='+redirectURI+'&response_type=token'
			))});

//console.log('before bool inside: '+bool);
//bool = true;
//console.log('after bool inside: '+bool);
//}
//Start init function when page loads
//window.addEventListener('DOMContentLoaded', app.main.init);
