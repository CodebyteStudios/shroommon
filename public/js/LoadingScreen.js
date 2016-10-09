function LoadingScreen () {}

LoadingScreen.prototype.preload = function () {
  this.game.load.crossOrigin = 'anonymous';
  this.game.load.bitmapFont(
    'pixelated_light',
    'https://cdn.hyperdev.com/us-east-1%3Aedca1fa4-beaf-4873-bac2-bd5488bd55f1%2Fpixelated_light.png',
    'https://cdn.hyperdev.com/us-east-1%3Aedca1fa4-beaf-4873-bac2-bd5488bd55f1%2Fpixelated_light.fnt'
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
