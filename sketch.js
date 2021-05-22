var mario,marioimg,goomba,goombaimg,goombagroup,bg,bgimg,ground,invground,coin,coinsgroup,coinimg,mariodead,mariodeadimg,jump,theme;
var play=1;
var gameState = play;
var end=0;
var score=0;

function preload(){
  marioimg = loadImage("sprites/mario1.gif");
  bgimg = loadImage("sprites/kingdom.jpg");
  goombaimg = loadImage("sprites/goomba1.gif");
  coinimg = loadImage("sprites/coin.png");
  mariodeadimg = loadImage("sprites/mariodead.jpg")
  jump = loadSound("sprites/jumpsound.mp3")
  theme = loadSound("sprites/themeMusic.mp3")
 }



function setup() {
  createCanvas(1500,700);
  theme.play();
 

  bg = createSprite(750,350,1500,700);
  bg.addImage(bgimg);
  bg.scale=8;

 

 mario = createSprite(100, 400, 50, 50);
  mario.addImage(marioimg);
  mario.debug = false;
  mario.setCollider("circle",0,0,80)
  
 ground = createSprite(750,690,1500,10);
 ground.visible  = false;

 invground=createSprite(750,695,1500,10)
 invground.visible = false; 

 
 mariodead = createSprite(750,350,1500,700);
mariodead.addImage(mariodeadimg);
mariodead.visible=false;

  
 goombagroup=createGroup();
 coinsgroup = createGroup();
}

function draw() {
  background(220);

  

  console.log(mario.y);

if (gameState===play){

 bg.velocityX= -6;

 if(bg.x<0){
   bg.x=bg.width/2;

 }

 if(keyDown("space") && mario.y >= 600 ){
 mario.velocityY = -20;
 jump.play();
 }
  
mario.velocityY = mario.velocityY + 0.8;

spawnGoomba();
spawnCoins()
if(mario.isTouching(coinsgroup)){
  coinsgroup.destroyEach();
  score=score+100;
}

if(mario.isTouching(goombagroup)){
gameState = end;
theme.stop();
}
}


mario.collide(invground);
 

  drawSprites();

  textSize(35);
  fill(255)
  text("Score: "+score,1300,80);

   if(gameState === end){
    ground.velocityX=0;
    
    mariodead.visible=true;
    goombagroup.setVelocityXEach(0);
    goombagroup.destroyEach();
    bg.velocityX=0;
    mario.velocityY=0;
    coinsgroup.setVelocityXEach(0);
    coinsgroup.destroyEach();
    
    textSize(38);
    fill(255,255,255)
    text("Press 'r' To Restart",610,175)

    if(keyCode===114){
      reset();
    }
    }
}

function spawnGoomba(){
if(frameCount % 100 === 0){
  goomba=createSprite(1500,650,10,50);
  goomba.addImage(goombaimg);
  goombagroup.add(goomba);
  goomba.velocityX = -10-3*score/100;
  goomba.scale = 0.18
}

}


function spawnCoins(){
if(frameCount % 180 === 0){
  coin=createSprite(1500,560,10,30);
  coin.y=Math.round(random(350,550))
  coin.addImage(coinimg);
  coinsgroup.add(coin);
  coin.velocityX=-10-score/100;
  coin.scale=0.2
}
}


function reset(){
 gameState=play;
 score=0;
 mariodead.visible=false;
 theme.play();
}