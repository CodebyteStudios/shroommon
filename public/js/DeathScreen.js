function DeathScreen () {
  this.title = "Game Over!";
}

DeathScreen.prototype.create = function () {
  this.game.add.text(0, 0, this.title, {
    font: 'bold 35px Arial',
    fill: '#00000'
  });
  
  this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.spaceKey.onDown.addOnce(this.start, this);
}

DeathScreen.prototype.start = function () {
  this.game.state.start('Game');
}