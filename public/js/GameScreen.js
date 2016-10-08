function GameScreen () {

}

GameScreen.prototype.create = function () {
  	this.player = new Player(this.game, STATE.WIDTH / 2, STATE.HEIGHT / 2);
 		EnemyManager.setup(this.game);
}

GameScreen.prototype.update = function () {
  this.player.update();
  EnemyManager.update(this.player);
}

GameScreen.prototype.render = function () {
  if (STATE.DEBUG.BODIES) {
    var self = this;
    self.game.debug.body(this.player.sprite);
    EnemyManager._enemies.forEach(function (enemy) {
      self.game.debug.body(enemy.head);
    });
  }
   
  if (STATE.DEBUG.STATS) {
    this.game.debug.renderShadow = false;
    this.game.debug.text('STATE.SCORE: ' + STATE.SCORE, 10, 20, 'black', 'bold 12px Arial');
    this.game.debug.text('STATE.KILLS: ' + STATE.KILLS, 10, 40, 'black', 'bold 12px Arial');
    this.game.debug.text('STATE.ENEMY.STEP_SIZE: ' + STATE.ENEMY.STEP_SIZE, 10, 60, 'black', 'bold 12px Arial');
    this.game.debug.text('STATE.ENEMY.STEP_DELAY: ' + STATE.ENEMY.STEP_DELAY, 10, 80, 'black', 'bold 12px Arial');
    this.game.debug.text('STATE.ENEMY.SPAWN_DELAY: ' + STATE.ENEMY.SPAWN_DELAY, 10, 100, 'black', 'bold 12px Arial');
  }
}