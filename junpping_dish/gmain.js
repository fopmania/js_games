var dish;
var walls = [];
function setup(){
	createCanvas(600, 600);
	dish = new Dish();
	walls.push(new Wall());
}

function draw(){
	background(255);

	for(var i = walls.length-1; i >= 0; i--){
		walls[i].update();
		walls[i].show();

		if(walls[i].hits()){
			console.log("HIT");
		}

		if(walls[i].offscreen()){
			walls.splice(i, 1);
		}
	}

	dish.update();
	dish.show();

	if(frameCount % 100 == 0){
		walls.push(new Wall());
	}

}

function keyPressed(){
	if(key == ' '){
//		console.log("SPACE");
		dish.jump();
	}
}