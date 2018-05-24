function Hero(p){
	this.p = p
	this.bound = 32;
	this.g = 0.7;
	this.jp = -15;

	this.x = 64;
	this.y = p.width/3;

	this.v = 0;
	
	this.crash = false;

	this.finished = false;

	this.img = p.loadImage('/assets/game/logo.png');

	this.reset = function(p){
		this.x = 64;
		this.y = p.width/3;
		this.v = 0;
		this.crash = false;
		this.finished = false;
	}

	this.show = function(p){
		if(this.crash)	p.fill(255 ,0 ,0);
		else p.fill(100 - this.v*7);


		var h = this.bound - this.v;
		p.image(this.img, this.x, this.y - h/2, this.bound + this.v*0.8, this.bound - this.v);
//		ellipse(this.x, this.y, this.bound + this.v*0.8, this.bound - this.v);
	}

	this.jump = function(){
		sounds.playJump();
		this.v += this.jp;
	}

	this.update_ending = function(p){
		this.y += 3.5;
	//	console.log(this.v);

		if( this.y > p.height){
			this.y = p.height;
			if(this.v >= 5.0){
				this.finished = true;
			}
			else{
				this.v += 1.5;
				if(this.v > 5.0)	this.v = 5.0;
			}

		}
	}

	this.update = function(p){
		this.v += this.g;
		this.v *= 0.9;
		this.y += this.v;

		if( this.y > p.height){
			this.y = p.height;
			this.v = 0;
		}

		if(this.y < env.score_h + this.bound*0.5){
			this.y = env.score_h + this.bound*0.5;
			this.v =0;
		}
	}
}