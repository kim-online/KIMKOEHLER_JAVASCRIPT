var x = 100;
var y = 100;
var bool = false;
function setup() {
	createCanvas(windowWidth, windowHeight);

}

function draw() {
	background(150, 100, 100);
  	ellipse(x, y, 80, 80);
  	if (bool == true){
  		x += 10;
  	}
  	console.log(x);
}

function touchStarted() {
	if (bool == false){
  	bool = true;
  } else {
  	bool = false;
  }
}