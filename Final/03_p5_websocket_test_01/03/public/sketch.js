var app = app || {};

app.main = (function() {

var socket;

var socketSetup = function(callback){
    console.log('Called socketStart.');
      socket = io.connect();

      // Listeners
      // We requested something through loadData
      // Here we'll listen to the data that comes back
      // and call the render()
      socket.on('movement', function(data) {
          console.log('Got his X position: ' + data.x);
        }
      );  
      callback();    
  }  

var sketch = function() {
    // your global var for your p5 sketch here  
  console.log('Sketch is running!');
  var x = 100;
  var y = 100;
  var bool = false;

  var setup = function() {
    console.log('Setup is running!');
    createCanvas(windowWidth, windowHeight);


}

var draw = function() {
  console.log('Draw is running!');
	background(150, 100, 100);
  	ellipse(x, y, 80, 80);
  	if (bool == true){
  		x += 10;
      console.log('Sending My X position: ' + x);

      var data = {
        x: x
      };

      socket.emit('movement', data);
  	}
  	
}

var touchStarted = function() {
  console.log('Touch is running!');
	if (bool == false){
  	bool = true;
  } else {
  	bool = false;
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
    socketSetup(sketch);
    // Optionally, you can specify a default container for the canvas and any other elements to append to with a second argument. Like this:
    // var myp5 = new p5(sketch, 'canvas-container');
  };

  return {
    init: init
  };

})();

window.addEventListener('DOMContentLoaded', app.main.init);