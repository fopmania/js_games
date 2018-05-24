var w_level = 5;
var INSERT_COIN = 'Insert coin';
var PRESS_RETRY = 'Pick up Shifts!';
var HIGH_SCORE = 'HIGH SCORE ';

var wall_cnt = 0;
var frame_respawn = 120;
var re_frame = 0;
var start_frame = 0;

var score = 0;
var hscore = 0;
var str_notice = PRESS_RETRY;
var str_debug ='';

var notice_on = true;

var level_up = false;

var debug_string_on = false;


function clearGameLogic(){
	wall_cnt = 0;
	frame_respawn = 120;
	re_frame = 0;
	start_frame = 0;

	score = 0;
	hscore = 0;
	str_notice = PRESS_RETRY;
	str_debug ='';
	notice_on = true;
	level_up = false;
}

function GameLogic(){
	this.keyPressed = function(pkey){
	};
}
GameLogic.prototype.resetGame = function(p){
	walls.length = 0;
	wall_cnt = 0;
	frame_respawn = 120;
	re_frame = 0;

	score = 0;
	str_notice = '';
//	str_debug = ;
	re_frame = p.frameCount;
	start_frame = p.frameCount;
	level_up = false;

	hero.reset(p);
	Wall.space = 150;
	Wall.speed = 2.0;
	Wall.ani_delta = 60;

	notice_on = true;
};



GameLogic.prototype.update = function(p){
		score = p.int((p.frameCount-start_frame)*Wall.speed*0.03);
		str_debug = 'level:'+ w_level + ' fcount:' + p.frameCount + ' respawn:' + frame_respawn;
		str_debug += '\nWall:' + wall_cnt + ' space:' + Wall.space + ' Wall.speed:' + p.int(Wall.speed);
		str_debug = re_frame +"/"+p.frameCount;
};

GameLogic.prototype.drawNotice = function(p){
	if(p.frameCount % 20 == 0) notice_on = !notice_on;
	if(env.notice_blink == false)	notice_on = true;

	if(notice_on){
		var th = 20;
		var w = p.min(env.w, c_width);
		p.textSize(th);
		p.fill(255);
		p.text(str_notice, (w - p.textWidth(str_notice))*0.5 - 1, (env.h - th)*0.5 - 1);
		p.fill(0);
		p.text(str_notice, (w - p.textWidth(str_notice))*0.5 + 1, (env.h - th)*0.5 + 1);
		p.fill(150);
		p.text(str_notice, (w - p.textWidth(str_notice))*0.5, (env.h - th)*0.5);
	}
};

GameLogic.prototype.drawScore = function(p){
	p.fill(80);
	p.textSize(15);
	p.textStyle(p.BOLD);
	var w = p.min(env.w, c_width);
	var sx = w - 20 - p.textWidth(score);
	p.text(score, sx, 15);
	if(hscore != 0){
		var sc = HIGH_SCORE + hscore;
		var x1 = w*0.5 - p.textWidth(sc)*0.5;
		var x2 = sx - p.textWidth(sc) - 40;
		var lx = p.min(x1, x2);
		p.text(sc, lx, 15);
	}

}


GameLogic.prototype.drawDebugString = function(p){
	p.fill(0);
	p.textSize(8);
	p.text(str_debug, 0, 8);
};

GameLogic.prototype.draw = function(p){
	game_bg.show(p);

	for(var i in walls){
		walls[i].show(p);
	}
	hero.show(p);
	this.drawNotice(p);
	this.drawScore(p);
	if( debug_string_on )	this.drawDebugString(p);
};


function GameIdle(){
//	inherit(GameLogic, this);
	GameLogic.apply( this, arguments);

	this.init = function(p){
		notice_on = true;
		str_notice = PRESS_RETRY;
	};

	this.update = function(){
//		this.base().update();
	};

	this.keyPressed = function(pkey){
		if(pkey == ' '){
			c_status = GAME_RUN;
		}
	};
}
GameIdle.prototype = GameLogic.prototype;




function GameRun(){
	notice_on = false;
	GameLogic.apply( this, arguments);

	this.init = function(p){
		notice_on = false;
		GameLogic.prototype.resetGame(p);
	};

	this.doDie = function(){
		hero.crash = true;
		//			console.log("HIT");
	};

	this.update = function(p){
		game_bg.update();

		for(var i = walls.length-1; i >= 0; i--){
			if(walls[i].hits(p)){
				c_status = GAME_END;
				this.doDie();
			}
			walls[i].update(p);

			if(walls[i].offscreen()){
				walls.splice(i, 1);
			}
		}

		hero.update(p);
		//	respawn walls
		if((p.frameCount - re_frame) % frame_respawn == 0){
			walls.push(new Wall(p));
			wall_cnt++;
			level_up = true;
			re_frame = p.frameCount;
		}

		// speed up
		if(level_up &&( wall_cnt % w_level == 0))
		{
			if(Wall.space > 110) Wall.space -= 1;
			if(Wall.speed < 12) Wall.speed += 0.3;
			if(Wall.ani_delta > 30) Wall.ani_delta -= 3; 
			if(frame_respawn > 50) frame_respawn -= 7;
			level_up = false;
		}
		GameLogic.prototype.update(p);
	};

	this.keyPressed = function(pkey, p){
		if(pkey == ' '){
			hero.jump();
		}
	};

}

GameRun.prototype = GameLogic.prototype;



function GameEnd(){
	GameLogic.apply( this, arguments);
	this.init = function(p){
		if( hscore < score ) hscore = score;
	};
	this.update = function(p){
		hero.update_ending(p);
		if(hero.finished){
			c_status = GAME_IDLE;
		}
	};
	// this.draw = function(){
	// 	GameLogic.prototype.draw();
	// }

}

GameEnd.prototype = GameLogic.prototype;





