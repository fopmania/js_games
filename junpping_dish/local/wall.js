function Wall(){
	this.top = random(height/2);
	this.bottom = random(height/2);
	this.x = width;
	this.w = 20;
	this.speed = 2;

	this.show = function(){
		fill(0);
		rect(this.x, 0, this.w, this.top);
		rect(this.x, height - this.bottom, this.w, this.bottom);
	}

	this.update = function(){
		this.x -= this.speed;
	}

	this.offscreen = function(){
		if(this.x < -this.w){
			return true;
		}else{
			return false;
		}
	}

	this.hits = function(dish){
		if(dish.y < this.top || dish.y < height - this.bottom){
			if
			return true;
		}

	}




}