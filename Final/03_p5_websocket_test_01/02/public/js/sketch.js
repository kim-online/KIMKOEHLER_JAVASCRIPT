var app = app || {};

app.main = (function() {

var sketch = function(p) {
    // your global var for your p5 sketch here  
console.log('Sketch.');
var socket;

var x = 100;
var y = 100;
var bool = false;

p.setup = function() {

  console.log('Setup.');
	p.createCanvas(p.windowWidth, p.windowHeight);

  socket = io.connect();



  socket.on('movement', function(data) {
          console.log('Got his X position: ' + data.x);
        }
      );

}

p.draw = function() {
  console.log('Draw');
	p.background(150, 100, 100);
  	p.ellipse(x, y, 80, 80);
  	if (bool == true){
  		x += 10;
      console.log('Sending My X position: ' + x);

      var data = {
        x: x
      };

      socket.emit('movement', data);
  	}
  	
}

p.touchStarted = function() {
  console.log('touchStarted');
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
    var myp5 = new p5(sketch, 'canvas-container');

    // Optionally, you can specify a default container for the canvas and any other elements to append to with a second argument. Like this:
    // var myp5 = new p5(sketch, 'canvas-container');
  };

  return {
    init: init
  };

})();

window.addEventListener('DOMContentLoaded', app.main.init);