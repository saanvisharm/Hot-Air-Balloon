var balloon;
var bgimg;
var database;

function preload(){
  bgimg=loadImage("bg.png");
  balloonimg1=loadAnimation("balloon1.png");
  balloonimg2=loadAnimation("balloon1.png","balloon2.png","balloon3.png");
}

function setup() {
  createCanvas(1000,1000);
  database=firebase.database();
 balloon= createSprite(250, 270, 50, 50);
 
balloon.addAnimation("balloon",balloonimg1);
balloon.scale=0.8;


var balloonposition=database.ref("balloon/position");
balloonposition.on("value",readposition);
}

function draw() {
  background(bgimg);  

 if(keyDown(LEFT_ARROW)){
  writePosition(-10,0);
  balloon.addAnimation("balloon",balloonimg2);
}
else if(keyDown(RIGHT_ARROW)){
  writePosition(10,0);
  balloon.addAnimation("balloon",balloonimg2);
}
else if(keyDown(UP_ARROW)){
  writePosition(0,-10);
  balloon.addAnimation("balloon",balloonimg2);
  balloon.scale=balloon.scale-0.01

}
else if(keyDown(DOWN_ARROW)){
  writePosition(0,+10);
balloon.addAnimation("balloon",balloonimg2);
balloon.scale=balloon.scale+0.01
}
  drawSprites();
  fill("black");
  textSize(20);
  text("**Use arrow keys to move the balloon.",30,30);
}


function writePosition(x,y){
database.ref("balloon/position").set({
x:balloon.x+x,
y:balloon.y+y    
})
}

function readposition(data){
position=data.val();
balloon.x=position.x;
balloon.y=position.y;
}
