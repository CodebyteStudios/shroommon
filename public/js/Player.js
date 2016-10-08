function Player (game, x, y) {
	
	this._game = game;
	this._textures = {};
	this._bouncePower = 1;
	this._angle = 0;
	
	var colors = { background: STATE.COLORS.BACKGROUND, outline: STATE.COLORS.OUTLINE, perlin: STATE.COLORS.PLAYER_CAP };
	var noise = { offset: { x: 20, y: 10 }, threshold: 0.5, swap: false };
	var seed = Math.random();
	
	this._textures.idle = Utils.pixelStringToBitmapData({
		game: this._game,
		scale: STATE.SCALE,
		seed: seed,
		pixelString: PixelStrings.playerIdle,
		colors: colors,
		noise: noise
	});
	
	this._textures.running = Utils.pixelStringToBitmapData({
		game: this._game,
		scale: STATE.SCALE,
		seed: seed,
		pixelString: PixelStrings.playerRunning,
		colors: colors,
		noise: noise
	});
	
	this.animTimer = 0;
	this.jumpTimer = 0;
	
	this.sprite = this._game.add.sprite(x, y, this._textures.idle);
	
	this._game.physics.enable([this.sprite], Phaser.Physics.ARCADE);
	
	this.sprite.anchor.set(0.5, 0.5);
	this.sprite.body.setSize(16 * STATE.SCALE, 28 * STATE.SCALE, 4 * STATE.SCALE, 0);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.gravity.y = 500 * STATE.SCALE;
	this.sprite.body.maxVelocity.x = 150 * STATE.SCALE;
	this.sprite.body.checkCollision.left = false;
	this.sprite.body.checkCollision.right = false;
}
	
Player.prototype.update = function () {
	
	var moving = false;

	if (this._game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		this.sprite.body.velocity. x-= (STATE.PLAYER.X_SPEED * STATE.SCALE) * (this.sprite.body.onFloor() ? 1 : 0.5);
		this.sprite.scale.x = -1;
		moving = true;
		if (this.sprite.body.onFloor()) this._angle = 10;
	}
	else if (this._game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.sprite.body.velocity.x += (STATE.PLAYER.X_SPEED * STATE.SCALE) * (this.sprite.body.onFloor() ? 1 : 0.5);
		this.sprite.scale.x = 1;
		moving = true;
		if (this.sprite.body.onFloor()) this._angle = -10;
	}
	else {
	  if (this.sprite.body.onFloor()) this._angle = 0;
	}
	
	if (this._game.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR, 10)) {
	  // do a jump
	  if (this.sprite.body.onFloor()) {
	    if (this._game.time.now > this.jumpTimer) {
	      this.sprite.body.velocity.y = -STATE.PLAYER.JUMP_POWER * STATE.SCALE;
			  this.jumpTimer = this._game.time.now + 250;
	    }
		}
		// do a smash
		else {
		  this.smashing = true;
		  this._angle = 180;
		  this.sprite.body.velocity.y = STATE.PLAYER.SMASH_POWER * STATE.SCALE;
		}
	}
	
	if (this.sprite.body.onFloor()) {
	  
	  if (moving) {
	    if (this._game.time.now > this.animTimer) {
			  this.sprite.loadTexture(this.sprite.texture === this._textures.idle.texture ? this._textures.running : this._textures.idle);
			  this.animTimer = this._game.time.now + (STATE.PLAYER.X_SPEED * 10);
	    }
	  }
	  else {
	    this.sprite.loadTexture(this._textures.idle);
	  }
	  
	  if (this.smashing) {
	    this.smashing = false;
	    this._angle = 0;
	  }
	  
	  this._bouncePower = 1;
	  this.sprite.body.drag.x = STATE.PLAYER.DRAG_GROUNDED;
	}
	else {
	  
	  if (!this.smashing) {
	    this._angle += this.sprite.scale.x == 1 ? STATE.PLAYER.ROTATION_SPEED : -STATE.PLAYER.ROTATION_SPEED;
	  }
	  
	  this.sprite.loadTexture(this._textures.idle);
	  this.sprite.body.drag.x = STATE.PLAYER.DRAG_AIRBORNE;
	}
	
	this.sprite.angle = this._angle;
}
	
Player.prototype.bounce = function () {
  this.sprite.body.velocity.y = -(100 * this._bouncePower) * STATE.SCALE;
  if (this._bouncePower < STATE.PLAYER.MAX_BOUNCE_POWER) this._bouncePower++;
}
