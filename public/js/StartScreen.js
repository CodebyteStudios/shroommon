function StartScreen () {}

StartScreen.prototype.preload = function () {
  this.game.load.crossOrigin = 'anonymous';
  this.game.load.bitmapFont(
    'pixelated',
    'https://cdn.hyperdev.com/us-east-1%3Aedca1fa4-beaf-4873-bac2-bd5488bd55f1%2Fpixelated.png',
    'https://cdn.hyperdev.com/us-east-1%3Aedca1fa4-beaf-4873-bac2-bd5488bd55f1%2Fpixelated.fnt'
  );
  this.game.load.audio('music', 'https://cdn.hyperdev.com/us-east-1%3Aedca1fa4-beaf-4873-bac2-bd5488bd55f1%2Fsong.wav');
}

StartScreen.prototype.create = function () {
  
  var bgMusic = this.game.add.audio('music');
  bgMusic.loopFull(0.8);
  bgMusic.volume = 1;
  bgMusic.play();
  
  this.game.stage.backgroundColor = 'rgba(' + GameState.get('COLORS.BACKGROUND').join(', ') + ')';
  
  this.title = this.game.add.bitmapText(
    this.game.world.centerX,
    this.game.world.centerY,
    'pixelated',
    'SHROOMMON',
    GameState.get('SCALE') * 20
  );
  this.title.anchor.set(0.5);
  
  this.pressSpaceToPlay = this.game.add.bitmapText(
    this.game.world.centerX,
    this.game.world.centerY + 120,
    'pixelated',
    'PRESS SPACE TO PLAY',
    GameState.get('SCALE') * 10
  );
  this.pressSpaceToPlay.anchor.set(0.5);
  
  this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.addOnce(function () {
    this.game.state.start('Game');
  }, this);
  
  this._hideTimer = this.game.time.now + 500;
}

StartScreen.prototype.update = function () {
  if (this.game.time.now > this._hideTimer) {
    this.pressSpaceToPlay.visible = !this.pressSpaceToPlay.visible;
    this._hideTimer = this.game.time.now + 500;
  }
}