function Enemy (game) {
  this._game = game;
  this._texture = null;
  this._growTimer = 0;
}

// static method
Enemy.bodyTexture = function (game) {
  
  var texture = null;
  
  if (Enemy._textures === undefined) Enemy._textures = {};
  
  if (Enemy._textures.body === undefined) {
    
    var colors = { background: GameState.get('COLORS.BACKGROUND'), outline: GameState.get('COLORS.OUTLINE'), perlin: GameState.get('COLORS.ENEMY_CAP') };
  	var noise = { offset: { x: 20, y: 10 }, threshold: 0.5, swap: false };
  		
  	Enemy._textures.body = Utils.pixelStringToBitmapData({
  		game: game,
  		scale: GameState.get('SCALE'),
  		seed: Math.random(),
  		pixelString: PixelStrings.enemyBody,
  		colors: colors,
  		noise: noise
  	});
  }
  
  return Enemy._textures.body;
}

// static method
Enemy.capTexture = function (game) {
  
  var texture = null;
  
  if (Enemy._textures === undefined) Enemy._textures = {};
  if (Enemy._textures.caps === undefined) Enemy._textures.caps = [];
  
  if (Enemy._textures.caps.length < GameState.get('ENEMY.MAX_TEXTURES')) {
    
    var colors = { background: GameState.get('COLORS.BACKGROUND'), outline: GameState.get('COLORS.OUTLINE'), perlin: GameState.get('COLORS.ENEMY_CAP') };
  	var noise = { offset: { x: 20, y: 10 }, threshold: 0.5, swap: false };
  		
  	texture = Utils.pixelStringToBitmapData({
  		game: game,
  		scale: GameState.get('SCALE'),
  		seed: Math.random(),
  		pixelString: PixelStrings.enemyCap,
  		colors: colors,
  		noise: noise
  	});
      
    Enemy._textures.caps.push(texture);
  }
  else {
    texture = Enemy._textures.caps[Math.floor(Math.random() * Enemy._textures.caps.length)];
  }
  
  return texture;
}

Enemy.prototype.create = function (index) {
  this.updateCapTexture();
  this.head = this._game.add.sprite(index * this._texture.width, GameState.get('HEIGHT') - this._texture.height, this._texture);
  this.body = this._game.add.sprite(index * this._texture.width, GameState.get('HEIGHT') + this.head.height, Enemy.bodyTexture(this._game));
  this._game.physics.enable([this.head], Phaser.Physics.ARCADE);
  this.head.body.moves = false;
  this.reset();
}

Enemy.prototype.spawn = function () {
  if (this.alive) return;
  this.reset();
  this.updateCapTexture();
  this.alive = true;
}

Enemy.prototype.reset = function () {
  this.alive = false;
  this.body.height = 0;
  this.updateHeadPosition();
}

Enemy.prototype.update = function (player) {
  
  if (!this.alive) return;
  
  if (this._game.time.now > this._growTimer) {
    this.body.height -= (Math.floor(Math.random() * (GameState.get('ENEMY.STEP_SIZE') * GameState.get('SCALE'))));
    this.head.y = (GameState.get('HEIGHT') - this._texture.height) + this.body.height + this.head.height;
    this._growTimer = this._game.time.now + GameState.get('ENEMY.STEP_DELAY');
  }
  
  if (this.head.y <= 0) {
    return 'GAMEOVER';
  }
  
  if (this._game.physics.arcade.overlap(player.sprite, this.head) && player.sprite.bottom < this.head.y + 10) {
    if (player.smashing === true) {
      return 'KILLED';
    }
    else {
      return 'BOUNCE';
    }
  }
}

Enemy.prototype.updateCapTexture = function () {
  this._texture = Enemy.capTexture(this._game);
  if (this.head) this.head.loadTexture(this._texture);
}

Enemy.prototype.updateHeadPosition = function () {
  this.head.y = (GameState.get('HEIGHT') - this._texture.height) + this.body.height + this.head.height;
}
