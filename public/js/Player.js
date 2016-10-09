function Player (game, x, y) {
	
	this._game = game;
	this._textures = {};
	this._bouncePower = 1;
	this._angle = 0;
	this._playWalkSound = true;
	
	var colors = { background: GameState.get('COLORS.BACKGROUND'), outline: GameState.get('COLORS.OUTLINE'), perlin: GameState.get('COLORS.PLAYER_CAP') };
	var noise = { offset: { x: 20, y: 10 }, threshold: 0.5, swap: false };
	var seed = Math.random();
	
	this._textures.idle = Utils.pixelStringToBitmapData({
		game: this._game,
		scale: GameState.get('SCALE'),
		seed: seed,
		pixelString: PixelStrings.playerIdle,
		colors: colors,
		noise: noise
	});
	
	this._textures.running = Utils.pixelStringToBitmapData({
		game: this._game,
		scale: GameState.get('SCALE'),
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
	this.sprite.body.setSize(16 * GameState.get('SCALE'), 28 * GameState.get('SCALE'), 4 * GameState.get('SCALE'), 0);
	this.sprite.body.collideWorldBounds = true;
	this.sprite.body.gravity.y = 500 * GameState.get('SCALE');
	this.sprite.body.maxVelocity.x = 150 * GameState.get('SCALE');
	this.sprite.body.checkCollision.left = false;
	this.sprite.body.checkCollision.right = false;
	
  this.walkSound = this._game.add.audio('walk', 0.1);
  this.jumpSound = this._game.add.audio('jump', 0.1);
  this.smashSound = this._game.add.audio('smash', 0.1);
}
	
Player.prototype.update = function () {
	
	var moving = false;

	if (this._game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		this.sprite.body.velocity. x-= (GameState.get('PLAYER.X_SPEED') * GameState.get('SCALE')) * (this.sprite.body.onFloor() ? 1 : 0.5);
		this.sprite.scale.x = -1;
		moving = true;
		if (this.sprite.body.onFloor()) this._angle = 10;
	}
	else if (this._game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.sprite.body.velocity.x += (GameState.get('PLAYER.X_SPEED') * GameState.get('SCALE')) * (this.sprite.body.onFloor() ? 1 : 0.5);
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
        this.jumpSound.play();
        this.sprite.body.velocity.y = -GameState.get('PLAYER.JUMP_POWER') * GameState.get('SCALE');
        this.jumpTimer = this._game.time.now + 250;
	    }
		}
		// do a smash
		else {
		  this.smashing = true;
		  this._angle = 180;
		  this.sprite.body.velocity.y = GameState.get('PLAYER.SMASH_POWER') * GameState.get('SCALE');
		}
	}
	
	if (this.sprite.body.onFloor()) {
    if (moving) {
      if (this._game.time.now > this.animTimer) {
        this.sprite.loadTexture(this.sprite.texture === this._textures.idle.texture ? this._textures.running : this._textures.idle);
        this.animTimer = this._game.time.now + (GameState.get('PLAYER.X_SPEED') * 10);
        if (this._playWalkSound) this.walkSound.play();
        this._playWalkSound = !this._playWalkSound;
      }
    }
    else {
      this.sprite.loadTexture(this._textures.idle);
    }
	  
	  if (this.smashing) {
      this.smashSound.play();
      this.smashing = false;
      this._angle = 0;
	  }
	  
	  this._bouncePower = 1;
	  this.sprite.body.drag.x = GameState.get('PLAYER.DRAG_GROUNDED');
	}
	else {
	  if (!this.smashing) {
	    this._angle += this.sprite.scale.x == 1 ? GameState.get('PLAYER.ROTATION_SPEED') : -GameState.get('PLAYER.ROTATION_SPEED');
	  }
	  
	  this.sprite.loadTexture(this._textures.idle);
	  this.sprite.body.drag.x = GameState.get('PLAYER.DRAG_AIRBORNE');
	}
	
	this.sprite.angle = this._angle;
}
	
Player.prototype.bounce = function () {
  this.jumpSound.play();
  this.sprite.body.velocity.y = -300 * GameState.get('SCALE');
  //if (this._bouncePower < GameState.get('PLAYER.MAX_BOUNCE_POWER')) this._bouncePower++;
}
