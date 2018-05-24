function Bgs(p){

	var bg_layer = function(_x, _speed, _img){
		this.x = _x;
		this.speed = _speed;
		this.img = _img;

		this.update = function(p){
			this.x -= this.speed;
			this.x = this.x%env.w;
		}
		this.show = function(p){
			p.image(this.img, this.x, env.h - this.img.height , env.w, this.img.height);
			p.image(this.img, this.x + env.w, env.h - this.img.height, env.w, this.img.height);
		}
	}

	this.layers = [ new bg_layer(0, 1, p.loadImage('/assets/game/game_bg2.png')), 
					new bg_layer(0, 1.5, p.loadImage('/assets/game/game_bg3.png')), 
					new bg_layer(0, 1.8, p.loadImage('/assets/game/game_bg1.png'))];

	this.show = function(p){
		for(var i in this.layers){
			this.layers[i].show(p);
		}
	}
	this.update = function(p){
		for(var i in this.layers){
			this.layers[i].update(p);
		}
	}
}
