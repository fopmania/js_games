var jumpSound;
var crashSound;

function Sounds(p){
	this.p = p
	this.preload = function(){
		//this.clearLoadSound();
		if(this.p.soundFormats != null){
			this.p.soundFormats('ogg', 'mp3');
			this.LoadSounds();
		}else{
			jumpSound = null;
			crashSound = null;
		}

	}

	this.clearLoadSound = function(){
		if(jumpSound != null){
			jumpSound.disconnect();
			jumpSound = null;
		}
		if(crashSound != null){
			crashSound.disconnect();
			crashSound = null;
		}
	}

	this.LoadSounds = function(){
		jumpSound = this.p.loadSound('/assets/game/jump.ogg', null, callback_error_jump, null);
		crashSound = this.p.loadSound('/assets/game/crash.mp3', null, callback_error_crash, null);
		if(jumpSound != null){
			jumpSound.setVolume(0.5);
		}
		if(crashSound != null){
			crashSound.setVolume(0.5);
		}
	}

	callback_error_jump = function(sound){
		jumpSound = null;
	}

	callback_error_crash = function(sound){
		crashSound = null;
	}

	this.playJump = function(){
		if(jumpSound != null){
			jumpSound.play();
		}
	}

	this.playCrash = function(){
		if(crashSound != null){
			crashSound.play();	
		} 
	}

	this.preload();
}