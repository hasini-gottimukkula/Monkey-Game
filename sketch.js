
var monkey , monkey_running, monkeyCollide;
var invisibleGround;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var bananaScore = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  monkey_running = loadAnimation("monkey_0.png","monkey_1.png","monkey_2.png","monkey_3.png","monkey_4.png","monkey_5.png","monkey_6.png","monkey_7.png","monkey_8.png")
  
  monkeyCollide = loadAnimation("monkey_1.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup(){
 createCanvas(600,300);
  
  obstacleGroup = createGroup();
  bananaGroup = createGroup();
  
 
  monkey = createSprite(80,230,10,10);
  monkey.scale = 0.12;
  monkey.addAnimation("monkey", monkey_running);
  monkey.addAnimation("collide", monkeyCollide);

  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  invisibleGround = createSprite(300,278,600,7);
  invisibleGround.visible = true;
     
}

function draw(){
  background(250);
  fill("black");
  text("SURVIVAL TIME: "+score, 470, 20);
  text("BANANAS COLLECTED: "+bananaScore,300,20);
  
  if (gameState === PLAY){
    obstacles();
    bananas();
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+score*1.5/100);
  
    if(keyDown("space")&&monkey.y >= 235) {
      monkey.velocityY = -13; 
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    if (monkey.isTouching(bananaGroup)){
      bananaScore++;  
      bananaGroup.destroyEach();
    
    }

    if (monkey.isTouching(obstacleGroup)){
      gameState = END;
    }
    
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    
    monkey.y = 235;
    monkey.scale = 0.1;
    monkey.changeAnimation("collide", monkeyCollide);
    
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    fill("yellow")
    stroke("black")
    textSize(30);
    text("GameOver", 220, 170);
    fill("black");
    textSize(15);
    text("Press 'R' to restart", 240, 200);
    
    if (keyDown("r")){
      bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey", monkey_running);
      score = 0;
      bananaScore = 0;
      gameState = PLAY; 
    }
  }
  
  drawSprites(); 
  
  monkey.collide(invisibleGround);
}

function bananas(){
  if (frameCount%80 === 0){
    
    banana = createSprite(620,120, 50, 50);
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.1;
    banana.velocityX =-(4+score*1.6/100); 
    banana.y = Math.round(random(50,120));
    banana.lifetime = 220;
    bananaGroup.add(banana);
    bananaGroup.add(banana);
  }
  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(620,253,50,50);
    obstacle.addAnimation("rock", obstacleImage);
    obstacle.setCollider("circle", 0, 0, 8);
    obstacle.scale = 0.13 ;
    obstacle.velocityX = -(4+score*1.6/100);
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
  }
  
}