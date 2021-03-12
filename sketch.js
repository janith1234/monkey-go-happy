var backImage, backgr;
var player, player_running;
var ground, ground_img;

var score = 0
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload() {
  backImage = loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  obstacle_img = loadImage("stone.png")
  food_img = loadImage("banana.png")
}

function setup() {
  createCanvas(800, 400);

  backgr = createSprite(0, 0, 800, 400);
  backgr.addImage(backImage);
  backgr.scale = 1.5;
  backgr.x = backgr.width / 2;
  backgr.velocityX = -4;

  player = createSprite(100, 340, 20, 50);
  player.addAnimation("Running", player_running);
  player.scale = 0.1;

  ground = createSprite(400, 350, 800, 10);
  ground.x = ground.width / 2;
  ground.visible = false;

  obstaclesGroup = new Group();
  foodGroup = new Group();
}

function draw() {
  background(0);

  if (gameState === PLAY) {
    spawnObstacles();
    spawnfood();
    if (backgr.x < 100) {
      backgr.x = backgr.width / 2;
    }
    if (foodGroup.isTouching(player)) {
      score = score + 1
      foodGroup.destroyEach();
      player.scale += 0.03
    }
    drawSprites();
    if(obstaclesGroup.isTouching(player)){
     gameState=END
     foodGroup.setVelocityEach=0;
     obstaclesGroup.setVelocityEach=0;
     backgr.velocityX=0
     foodGroup.setLifetimeEach(-1);
     obstaclesGroup.setLifetimeEach(-1);
     player.visible = false;
    
    foodGroup.destroyEach();
    obstaclesGroup.destroyEach();

    textSize(30);
    fill(255);
    text("Game Over!", 300,220);
    }    

    if (keyDown("space")) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;

    player.collide(ground);

  }

  
}
function spawnObstacles() {
  //write code here to spawn the obstacles
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(800, 350, 10, 40);
    obstacle.velocityX = -(4 + 2 * score / 100);
    obstacle.addImage(obstacle_img);

    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}
function spawnfood() {
  //write code here to spawn the obstacles
  if (frameCount % 150 === 0) {
    var obstacle = createSprite(800, 350, 10, 40);
    obstacle.velocityX = -(4 + 2 * score / 100);
    obstacle.addImage(food_img);
    obstacle.y = Math.round(random(100, 200))
    obstacle.scale = 0.05;
    obstacle.lifetime = 300;
    foodGroup.add(obstacle);
  }
}