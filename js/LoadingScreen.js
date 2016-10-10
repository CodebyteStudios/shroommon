function LoadingScreen () {}

LoadingScreen.prototype.preload = function () {
  this.game.load.crossOrigin = 'anonymous';
  this.game.load.bitmapFont(
    'pixelated_light',
    'assets/pixelated_light.png',
    'assets/pixelated_light.fnt'
  );
}

LoadingScreen.prototype.create = function () {
  this.game.stage.backgroundColor = 'rgba(' + GameState.get('COLORS.OUTLINE').join(', ') + ')';
  
  this.title = this.game.add.bitmapText(
    this.game.world.centerX,
    this.game.world.centerY,
    'pixelated_light',
    'A CODEBYTE STUDIOS PRODUCTION',
    GameState.get('SCALE') * 10
  );
  this.title.anchor.set(0.5);
  this.title.color = 'white';
  
  var self = this;
  window.setTimeout(function () {
    self.game.state.start('Start');
  }, 1000);
}
