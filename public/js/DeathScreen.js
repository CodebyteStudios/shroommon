function DeathScreen () {}

DeathScreen.prototype.create = function () {
  
  this.game.stage.backgroundColor = 'rgba(' + GameState.get('COLORS.BACKGROUND').join(', ') + ')';
  
  this.title = this.game.add.bitmapText(this.game.world.centerX, this.game.world.centerY, 'pixelated', 'GAME OVER', GameState.get('SCALE') * 20);
  this.title.anchor.set(0.5);
  
  this.pressSpaceToRestart = this.game.add.bitmapText(
    this.game.world.centerX,
    this.game.world.centerY + 120,
    'pixelated',
    'PRESS SPACE TO RESTART',
    GameState.get('SCALE') * 10
  );
  this.pressSpaceToRestart.anchor.set(0.5);
  
  this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(function () {
    this.game.state.start('Game');
  }, this);
  
  this._hideTimer = this.game.time.now + 500;
  
  this.score = this.game.add.bitmapText(
    10,
    20,
    'pixelated',
    'SCORE: ' + GameState.get('SCORE'),
    GameState.get('SCALE') * 20
  );
}

DeathScreen.prototype.update = function () {
  if (this.game.time.now > this._hideTimer) {
    this.pressSpaceToRestart.visible = !this.pressSpaceToRestart.visible;
    this._hideTimer = this.game.time.now + 500;
  }
}
