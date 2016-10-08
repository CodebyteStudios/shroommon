function StartScreen () {
  this.title = "Shroommon";
}

StartScreen.prototype.create = function () {
  this.game.add.text(160 / 2, 144 / 2, this.title, {
    font: 'bold 35px Arial',
    fill: '#00000'
  });
  
  var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
      spaceKey.onDown.addOnce(this.start, this);
}

StartScreen.prototype.start = function () {
  this.game.state.start('Game');
}