
var x = 400;
var y = 50;
var d=60;
var speed = 4;
var fontV;



function setup(){
  createCanvas(800, 800);
  noStroke();
  smooth();
  
}

function draw(){
  background(255,255,255);
  
  //Ball
  fill(0,0,0);
  ellipse(x,y,d,d);
  
  
   //Speed
  speed=speed+0.3;
  y=y+speed;
  
  //Bounce
  if (y>height-d){
    y=height-d;
    speed=speed* -0.6;}
  
  if (mouseX > x - d && mouseX < x + d && mouseY < y + d && mouseY > y - d){
  if (mousePressed == true){
    y=mouseY;
    x=mouseX;
  }
  }
  
}