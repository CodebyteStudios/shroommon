function Enemy (game) {
  this._game = game;
  this._texture = null;
}

Enemy.prototype.create = function (index) {
  this.randomTexture();
  this.head = this._game.add.sprite(index * this._texture.width, STATE.HEIGHT - this._texture.height, this._texture);
  this.body = this._game.add.sprite(index * this._texture.width, STATE.HEIGHT + this.head.height, EnemyManager.bodyTexture(this._game));
  this.body.height = 0;
  this.growTimer = 0;
  this._game.physics.enable([this.head], Phaser.Physics.ARCADE);
  this.head.body.moves = false;
  this.alive = false;
  this.updateHeadPosition();
}

Enemy.prototype.update = function (player) {
  if (!this.alive) return;
  
  if (this._game.time.now > this.growTimer) {
    this.body.height -= (Math.floor(Math.random() * (STATE.ENEMY.STEP_SIZE * STATE.SCALE)));
    this.head.y = (STATE.HEIGHT - this._texture.height) + this.body.height + this.head.height;
    this.growTimer = this._game.time.now + STATE.ENEMY.STEP_DELAY;
  }
  
  if (this.head.y <= 0) {
    // game over
    this.die();
  }
  
  if (this._game.physics.arcade.overlap(player.sprite, this.head) && player.sprite.bottom < this.head.y + 10) {
    if (player.smashing == true) {
      this.die();
    }
    else {
      player.bounce();
    }
  }
}
  
Enemy.prototype.randomTexture = function () {
  this._texture = EnemyManager.randomTexture(this._game);
  if (this.head) this.head.loadTexture(this._texture);
}
  
Enemy.prototype.die = function () {
  STATE.KILLS++;
  STATE.SCORE += -this.body.height;
  this.alive = false;
  this.body.height = 0;
  this.updateHeadPosition();
  EnemyManager.killedOne();
}
  
Enemy.prototype.updateHeadPosition = function () {
  this.head.y = (STATE.HEIGHT - this._texture.height) + this.body.height + this.head.height;
}
