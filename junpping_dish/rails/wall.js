function Wall(p){
	this.p = p
	var _h = env.h - env.score_h;
	var _m = _h/8;
	var _pos = p.random((_h - Wall.space)*3/4);
	this.dh = 15;
	this.top = env.score_h + _pos + this.dh;
	this.bottom = p.height - this.top - Wall.space;
	this.x = env.w;
	this.crash = false;
	this.dishs = [];	

	this.ani_start = 0;		//	the frame of the start animation
	this.ani_end = 0;


	this.init = function(p){
		if(Wall.light_imgs.length == 0){
			Wall.light_imgs.push(p.loadImage('/assets/game/light.png'));
			Wall.light_imgs.push(p.loadImage('/assets/game/light_bar.png'));
		}
		if(Wall.dish_imgs.length == 0){
			Wall.dish_imgs.push(p.loadImage('/assets/game/dish1.png'));
			Wall.dish_imgs.push(p.loadImage('/assets/game/dish2.png'));
			Wall.dish_imgs.push(p.loadImage('/assets/game/dish3.png'));
		}
	}

	this.init(p);

	var Swall = function(p, _x, _y, _img){
		this.img = _img;
		this.x = _x;
		this.y = _y;
		var r = Wall.width/_img.width;
		this.w = r*_img.width;
		this.h = r*_img.height;

		this.show = function(p, _x, _y){
			p.image(this.img, _x, _y, Wall.width, this.h);
		}
	}

	this.bulidWall = function(p){

		var cy = this.top;
/*		while(env.score_h < cy){
			var dimg = Wall.dish_imgs[int(random(3))];
			var d = new Swall(random(5) - 2, cy, dimg);
			d.y -= d.h;
			this.dishs.push(d);
			cy -= d.h;
		}*/

		var light = Wall.light_imgs[0];	
		var bar = Wall.light_imgs[1];	
		var l = new Swall(p, 0, cy, light);
		l.y -= l.h;
		cy -= l.h;
		var b = new Swall(p, 0, env.score_h, bar);
		b.h = cy - env.score_h;
		this.dishs.push(b);
		this.dishs.push(l);

		var cy = p.height - this.bottom; 
		while( p.height > cy){
//			rect(this.x, cy, Wall.width, this.h_stroy);
			var obj = Wall.dish_imgs[p.int(p.random(3))];
			var d = new Swall(p, p.random(5) - 2, cy, obj);
			this.dishs.push(d);
			cy += d.h;
		}
		this.ani_start = p.frameCount;
		this.ani_end = this.ani_start + Wall.ani_delta;
	}
	this.bulidWall(p);

	this.drawWallBox = function(p){
		p.fill(255,0, 0);
		p.rect(this.x, env.score_h, Wall.width, this.top - env.score_h + this.dh);
		p.rect(this.x, height - this.bottom, Wall.width, this.bottom);
	}

	this.show = function(p){
		p.strokeWeight(1);

		//drawWallBox(p);

		p.fill(100);
		var delta = 1.0;
		if( this.ani_end > p.frameCount ){
			delta = 1.0-((this.ani_end-p.frameCount)/Wall.ani_delta);
		}
		for(var i in this.dishs){
			var d = this.dishs[i];
//			rect(this.x + d.x, d.y, this.w, this.dh, 10, 10,1,1);
//			image(d.img, this.x + d.x + 250*(1-delta), d.y*delta, Wall.width, this.dh);
			d.show(p, this.x + d.x + 250*(1-delta), d.y*delta, Wall.width);
		}
	}

	this.update = function(p){
		this.x -= Wall.speed;
	}

	this.offscreen = function(){
		if(this.x < -Wall.width){
			return true;
		}else{
			return false;
		}
	}

	this.hits = function(p){
		var _tol = (hero.bound - hero.v)*0.3;
		if(hero.y - _tol < this.top + this.dh || hero.y + _tol > p.height - this.bottom){
			if(hero.x + _tol > this.x && hero.x - _tol < this.x + Wall.width){
				sounds.playCrash();
				this.crash = true; 
				return true;
			}
		}
		return false;
	}
}
Wall.width = 30;
Wall.space = 130;
Wall.speed = 2.0;
Wall.ani_delta = 60;
Wall.dish_imgs = [];
Wall.light_imgs = [];
