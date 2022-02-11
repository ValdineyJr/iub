var balao,balloonImage1,balloonImage2;
var database;
var height;

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon-01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon-01.png","Images/HotAirBallon-01.png",
   "Images/HotAirBallon-01.png","Images/HotAirBallon-02.png","Images/HotAirBallon-02.png",
   "Images/HotAirBallon-02.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png","Images/HotAirBallon-03.png");
  }

//Função para definir o ambiente inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balao=createSprite(250,650,150,150);
  balao.addAnimation("hotAirBalloon",balloonImage1);
  balao.scale=0.5;

  var balloonHeight=database.ref('balao/height');
  balloonHeight.on("value",readHeight, showError);
  textSize(20); 
}

// função para exibir a UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balao.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balao.addAnimation("hotAirBalloon",balloonImage2);
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balao.addAnimation("hotAirBalloon",balloonImage2);
    balao.scale=balao.scale -0.005;
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,+10);
    balao.addAnimation("hotAirBalloon",balloonImage2);
    balao.scale=balao.scale+0.005;
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("Use as setas para mover o balão!",40,40);
}


function updateHeight(x,y){
  database.ref('balao/height').set({
    'x': height.x + x ,
    'y': height.y + y
  })
}

function readHeight(data){
  height = data.val();
  console.log(height.x);
  balao.x = height.x;
  balao.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}
