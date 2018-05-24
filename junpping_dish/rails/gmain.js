
var game;
var gameI;
var gameR;
var gameE;

var sounds;
var hero;
var walls = []; 
var game_bg; 


var GAME_IDLE = 0;
var GAME_RUN = 2;
var GAME_END = 3;

var c_status = GAME_IDLE;
var o_status = GAME_IDLE;
var frame_status_changing = 0;

var p5canvas;
var gcanvas;
var c_width;
var p5inst;
var p5sketch;

//var onload;
var originalGameCanvas;
var parentGameCanvas;
var curGameCanvas;

function includeJs(jsFilePath){
	var js = document.createElement('script');

	js.type = 'text/javascript';
	js.src = jsFilePath;
	document.body.appendChild(js);
}




var sketch = function(p) {
	p5sketch = p
	p.preload = function(){
	}


	function clearGmain(){
		game = null;
		gameI = null;
		gameR = null;
		gameE = null;

		sounds = null;
		hero = null;
		walls.length = 0; 
		game_bg = null; 

		c_status = GAME_IDLE;
		o_status = GAME_IDLE;
		frame_status_changing = 0;

		gcanvas = null;
		p5canvas = null;
		//c_width = 0;

	}

	p.setup = function(){

		//clearGmain();
		env.h = 400;
		env.w = 600;
		gcanvas = document.getElementById('gameCanvas');
		gcanvas.focus();
		resetMargin(p);
		// gcanvas.style.height = env.h + 'px';
		c_width = gcanvas.clientWidth;
	//	gcanvas.style.width = '100%';
		gcanvas.style.marginLeft = 'auto';
		gcanvas.style.marginRight = 'auto';
	    style = window.getComputedStyle(gcanvas);   
	    env.l_margin = parseInt(style.getPropertyValue('margin-left'));
	    env.r_margin += parseInt(style.getPropertyValue('margin-right'));

	    //if(p5canvas == null)
		p5canvas = p.createCanvas(c_width, env.h);
	    
	    
	    p5canvas.mouseClicked(canvasMouseClicked);
	 	p5canvas.parent('gameCanvas');
		re_frame = p.frameCount;

		p.textFont('gfont');
		p.strokeWeight(0);


		if(game_bg == null)
			game_bg = new Bgs(p);
		
		if(hero == null)	
			hero = new Hero(p);

		if(gameI == null)	
			gameI = new GameIdle(p);
		if(gameR == null)	
			gameR = new GameRun(p);
		if(gameE == null)	
			gameE = new GameEnd(p);

		if(sounds == null){
			sounds = new Sounds(p);
		}	
		// else{
		// 	sounds.p = p;
		// 	sounds.LoadSounds();
		// }

		game = gameI;
		clearGameLogic();
		game.init();
		o_status = c_status = GAME_IDLE;
		p.frameRate(60);

	}


	p.draw = function(){
		if( c_status != o_status){
			o_status = c_status
			switch(c_status){
				case GAME_IDLE:
					game = gameI;
				break;
				case GAME_RUN:
					frame_status_changing = p.frameCount;
					game = gameR;
				break;
				case GAME_END:
					frame_status_changing = p.frameCount;
					game = gameE;
				break;
			}
			game.init(p);
		}
		var bc = 255;
		if(c_status == GAME_RUN){
			var dt = p.frameCount - frame_status_changing;
			if(dt < 120){
				bc = p.max( bc, 210);
				bc = p.min( 255, 210 + 45.0*(dt/120.0));
			}
		}
		else{
			bc = 210;
			var dt = p.frameCount - frame_status_changing;
			if(dt < 120){
				bc = 210 + 45.0*(1.0 - (dt/120.0));
			}
		}
		p.background(bc);
		game.update(p);
		game.draw(p);
	}

	function resetMargin(p){
		gcanvas.style.width = p.min( gcanvas.parentNode.clientWidth, env.w) + 'px';
		c_width = gcanvas.clientWidth;
	    style = window.getComputedStyle(gcanvas);   
	    env.l_margin = parseInt(style.getPropertyValue('margin-left'));
	    env.r_margin = parseInt(style.getPropertyValue('margin-right'));
	}

	p.keyPressed = function(){
		if( p.keyCode == 32)
			game.keyPressed(' ');
	}

	p.windowResized = function(){
		if(gcanvas == null)		return;
		resetMargin(p);
	//	let w = min(env.w, c_width - (env.l_margin + env.r_margin));
		p.resizeCanvas(c_width, env.h);
		// if(c_width - env.b_margin < env.w){
		//   		resizeCanvas(c_width - env.b_margin, env.h);
		//   }else{
		//   		resizeCanvas(env.w, env.h);
	 //  	}
	}
	function canvasMouseClicked(){
		game.keyPressed(' ');
	}
}

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }
});



function resetGameCanvas(){	
	if($('#gameCanvas') != null && $('#gameCanvas').length != 0){
		//parentGameCanvas = $('#gameCanvas');
		//parentGameCanvas.innerHTML = '';
		var childNodes = $('#gameCanvas')[0].firstChild;
		if(childNodes != null) {
	    	childNodes.remove();
		}
	}
	if(game_bg != null)
		game_bg = null;
	
	if(hero != null)	
		hero = null;

	if(gameI != null)	
		gameI = null;
	if(gameR != null)	
		gameR = null;
	if(gameE != null)	
		gameE = null;

	if(sounds != null){
		//sounds.clearLoadSound();
		sounds = null;
	}	

	if(p5inst != null){
		//p5canvas.remove();
		p5inst.remove();
	}
	//var myClone = originalGameCanvas.clone();
	//parentGameCanvas.append(myClone);

}




if(p5inst == null){
 	p5inst = new p5(sketch);
}else{
	resetGameCanvas();
    parentGameCanvas = $('#gameCanvas'); 
	p5inst = new p5(sketch);
}

//$(document).on('turbolinks:load', function () 
window.onload = function()
{
	//alert('window.onload')
	resetGameCanvas();
    parentGameCanvas = $('#gameCanvas'); 
	p5inst = new p5(sketch);
}

// $(document).on('page:fetch', function() {
//   	alert('page:fetch')
// 	resetGameCanvas();
//     parentGameCanvas = $('#gameCanvas'); 
// 	p5inst = new p5(sketch);
// });

$(document).on('page:fetch', function () {
	//alert('page:fetch')
	resetGameCanvas();
    parentGameCanvas = $('#gameCanvas'); 
	p5inst = new p5(sketch);
});

