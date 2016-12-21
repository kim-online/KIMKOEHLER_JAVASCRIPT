var app = app || {};

app.main = (function() {

var onScreen = false;
var left = false;



var sidePick = function(){

  

  document.getElementById("left").innerHTML = "<h1>Left</h1>";
  document.getElementById("right").innerHTML = "<h1>Right</h1>";
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
    onScreen = true;
    left = true;
    var myp5 = new p5(sketch1, 'canvas-container-left');
  });

  $('#right').on('click', function(event){
    console.log('right click');
    $('.button').removeClass('visible');
    $('.button').addClass('hidden');
    $('#container-right').removeClass('hidden');
    $('#container-right').addClass('visible');
    onScreen = false;
    left = false;
    var myp5 = new p5(sketch1, 'canvas-container-right');
  });


  //var myp5 = new p5(sketch, 'canvas-container');

};

var sketch1 = function(p) {
    // your global var for your p5 sketch here  
console.log('Sketch.');

var socket;

var x = 0;
var __x = 10;
var y = 100;
var bool = false;
//var canvasWidth = p.windowWidth;
//var canvasHeight = p.windowHeight;
var canvasWidth = p.windowWidth;
var canvasHeight = p.windowHeight;

p.setup = function() {
  socket = io.connect();
  console.log('Setup.');
	//p.createCanvas(p.windowWidth, p.windowHeight);
  
  p.createCanvas(canvasWidth, canvasHeight);
  

  var size = {
    width: p.windowWidth,
    height: p.windowHeight

  };
  
  socket.emit('size', size);


  socket.on('movement', function(data) {
          console.log('Got his X position: ' + data.x);
        }
      );
  socket.on('sizeHeight', function(_height){
    console.log('New canvas height: ' + _height);
    canvasHeight = _height;
    p.windowResized();

  });

    socket.on('sizeWidth', function(_width){
    console.log('New canvas width: ' + _width);
    canvasWidth = _width;
    p.windowResized();

  });

    socket.on('movementplus', function(_x){
    console.log('New x: ' + _x);
    __x = _x;
   // p.windowResized();

  });  

}

p.draw = function() {
  console.log('Draw');
  
	p.background(150, 100, 100);
  //if (onScreen == true){
    
  	p.ellipse(__x, y, 80, 80);
  
    if (bool == true){

    if (__x < canvasWidth - (canvasWidth-p.windowWidth)){
      x = 10;
    } if (__x > canvasWidth - (canvasWidth-p.windowWidth)){
      x = -10;
    } else {
      x = 0;
    }

      console.log('Sending My X position: ' + x);
      
      var data = {
        x: x
      };

      socket.emit('movement', data);
    }
  	
  	//}
}

p.touchStarted = function() {
  console.log('touchStarted');
	if (bool == false){
  	bool = true;
  } else {
  	bool = false;
  }
}

p.windowResized = function() {
  console.log('resized');
  p.resizeCanvas(canvasWidth, canvasHeight);
  $('body').css('align-items', 'center');
  if(left == true){
  $('body').css('justify-content', 'flex-start');
  } else{
    $('body').css('justify-content', 'flex-end');
  }
  
}

};

var init = function(){
    console.log('Initializing app.');

    // If you are writing long programs that mix multiple JS libraries,
    // you might want to start your P5 sketch in an "instance mode".
    // One of the benefits is that it enables you to run multiple P5 sketch in one program.
    // Learn more: https://github.com/processing/p5.js/wiki/p5.js-overview#instantiation--namespace
    //var myp5 = new p5(sketch, 'canvas-container');
    sidePick();

    // Optionally, you can specify a default container for the canvas and any other elements to append to with a second argument. Like this:
    // var myp5 = new p5(sketch, 'canvas-container');
  };

  return {
    init: init
  };

})();

window.addEventListener('DOMContentLoaded', app.main.init);