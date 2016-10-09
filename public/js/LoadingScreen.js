function LoadingScreen () {}

LoadingScreen.prototype.preload = function () {
  this.game.load.crossOrigin = 'anonymous';
  window.font = this.game.load.bitmapFont(
    'pixelated',
    'https://cdn.hyperdev.com/us-east-1%3Aedca1fa4-beaf-4873-bac2-bd5488bd55f1%2Fpixelated.png',
    'https://cdn.hyperdev.com/us-east-1%3Aedca1fa4-beaf-4873-bac2-bd5488bd55f1%2Fpixelated.fnt'
  );
}

LoadingScreen.prototype.create = function () {
  
  console.log('here!');
  
  this.game.stage.backgroundColor = 'rgba(' + GameState.get('COLORS.OUTLINE').join(', ') + ')';
  
  this.title = this.game.add.bitmapText(
    this.game.world.centerX,
    this.game.world.centerY,
    'pixelated',
    'A CODEBYTE STUDIOS PRODUCTION',
    GameState.get('SCALE') * 20
  );
  this.title.anchor.set(0.5);
  
  var self = this;
  window.setTimeout(function () {
    self.game.state.start('Start');
  }, 1000);
}
