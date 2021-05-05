var dog,sadDog,happyDog, database;
var foodS,foodStock;
var feed, lastFeed;
var addFood;
var foodObj;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedtheDog = createButton(" FEED THE DOG");
  feedtheDog.position(950,95); 
  feedtheDog.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  var feedTimeRef = database.ref('FeedTime')
  feedTimeRef.on('value', function(data){
    lastFeed = data.val();
  })
 
  //write code to display text lastFed time here
  fill("white")
  textSize(15)
if(lastFeed>=12){
  text("lastFeed:"+lastFeed%12+"PM",100,100)
}else if(lastFeed==0){
  text("LastFeed 12 AM:",100,100);
}else{
  text("lastFeed:"+lastFeed+"AM",100,100)
}
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var foodStockVal = foodObj.getFoodStock()
  if(foodStockVal <= 0){
    foodObj.updateFoodStock(foodStockVal*0);
  }else{
    foodObj.updateFoodStock(foodStockVal-1);
  }
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
    feedTime: hour() 
  })
  }
  


//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}