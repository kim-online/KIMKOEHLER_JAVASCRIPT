var app = app || {};

app.main = (function() {

var left = false;
var right = false;
var sidePick = function(){

  

  document.getElementById("left").innerHTML = "<h1>Left</h1>";
  document.getElementById("right").innerHTML = "<h1>Right</h1>";
  //make sure canvas is hidden and the buttons are visible to start with
  $('.button').removeClass('hidden');
  $('.button').addClass('visible');
  $('.canvas').removeClass('visible');
  $('.canvas').addClass('hidden');

  $('#left').on('click', function(event){
    console.log('left click');
    $('.button').removeClass('visible');
    $('.button').addClass('hidden');
    $('#container-left').removeClass('hidden');
    $('#container-left').addClass('visible');
    left = true;
    //initiate the sketch in the "left" canvas
    var myp5 = new p5(sketch1, 'canvas-container-left');
  });

  $('#right').on('click', function(event){
    console.log('right click');
    $('.button').removeClass('visible');
    $('.button').addClass('hidden');
    $('#container-right').removeClass('hidden');
    $('#container-right').addClass('visible');
    right = true;
    //initiate sketch in the right canvas
    var myp5 = new p5(sketch1, 'canvas-container-right');
  });


};

var sketch1 = function(p) {

console.log('Sketch.');

var socket;

//start by making canvas as large as your device's screen
var canvasWidth = p.windowWidth;
var canvasHeight = p.windowHeight;

//start outside the screen
var x = -80;
//and in the middle of the canvas
var y = canvasHeight/2;
//bool is set true when touching screen
var bool = false;
//trigger takes info from app.js to know when to switch screen
var _trigger = false;

p.setup = function() {

  socket = io.connect();
  console.log('Setup.');
  
  p.createCanvas(canvasWidth, canvasHeight);
  
    var player = {
    side: left,
    width: p.windowWidth,
    height: p.windowHeight
  };
  //send info to server about your side and width/height
  socket.emit('player', player);

  //always monotoring the circles position
  socket.on('movement', function(data) {
          console.log('Got his X position: ' + data.x);
        }
      );
  //changing the height of the canvas if needed
  socket.on('sizeHeight', function(_height){
    console.log('New canvas height: ' + _height);
    canvasHeight = _height;
    p.windowResized();

  });
  //listen for the trigger to change the screen of the circle
  socket.on('trigger', function(trigger){
    console.log('Change screen! ' + trigger);
    _trigger = trigger;

  });




}

p.draw = function() {
  console.log('Draw');
  
	p.background(150, 100, 100);
  
    
  	p.ellipse(x, y, 80, 80);
    //move circle if screen is touched or if recieving the trigger so the motion from the other device is kept going.
    if (bool == true || _trigger == true){

      x += 10;
      console.log('Sending My X position: ' + x);
      
      var data = {
        side: left,
        localWidth: p.windowWidth,
        x: x
      };
      //sending the updated position of the circle
      socket.emit('movement', data);
    } 

  	
  	//}
}

//this is the touch function that triggers the circle to move
p.touchStarted = function() {
  console.log('touchStarted');
	if (bool == false){
  	bool = true;
  } else {
  	bool = false;
  }
}

//this is called if recieving info about a change of settings in the canvas from the server
p.windowResized = function() {
  console.log('resized');
  p.resizeCanvas(canvasWidth, canvasHeight);
  //when the canvas is updated, we need to set it to the center of the screen again.
  $('body').css('align-items', 'center');
  //and also the circle to the middle of the canvas
  y = canvasHeight/2;
  
}

};

var init = function(){
    console.log('Initializing app.');
    //start by choosing what side your device is on
    sidePick();

  };

  return {
    init: init
  };

})();

window.addEventListener('DOMContentLoaded', app.main.init);