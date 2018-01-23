function Dish(){
	this.x = 64;
	this.y = width/3;

	this.g = 0.6;
	this.j = -15;
	this.v = 0;

	this.show = function(){
		fill(0);
		ellipse(this.x, this.y, 32, 32)
	}

	this.jump = function(){
		this.v += this.j;
	}

	this.update = function(){
		this.v += this.g;
		this.v *= 0.9;
		this.y += this.v;

		if( this.y > height){
			this.y = height;
			this.v = 0;
		}

		if(this.y < 0){
			this.y = 0;
			this.v =0;
		}
	}
}