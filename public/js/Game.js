/* global Phaser noise */

/* Shroom Mon (or another cooler name) */

// The idea of this game is that your a mushroom, trying to smash all the other 
// mushrooms, which are constantly growing taller. The taller the mushrooms grow, the 
// more you get for smashing them, but you'll need to bounce off of the shorter mushrooms
// to reach the taller mushrooms. If a mushroom reaches the top of the screen, you lose

window.Game = {
  game: null,
  player: null,
  setup: function () {
    this.game = new Phaser.Game(STATE.WIDTH, STATE.HEIGHT, Phaser.AUTO, 'game', {
      init: this.init.bind(this),
      preload: this.preload.bind(this),
      create: this.create.bind(this),
      update: this.update.bind(this),
      render: this.render.bind(this)
    });
  },
  init: function () {
    var gameContainer = document.getElementById('game');
    gameContainer.style.width = STATE.WIDTH;
    gameContainer.style.height = STATE.HEIGHT;
  },
  preload: function () {},
  create: function () {
    this.game.stage.backgroundColor = '#FFF';
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
 		this.game.physics.arcade.gravity.y = 300 * STATE.SCALE;
 		
 		this.player = new Player(this.game, STATE.WIDTH / 2, STATE.HEIGHT / 2);
 		
 		EnemyManager.setup(this.game);
 	},
 	update: function () {
 		this.player.update();
 		EnemyManager.update(this.player);
 	},
 	render: function () {
 	  if (STATE.DEBUG.BODIES) {
      var self = this;
   	  self.game.debug.body(player.sprite);
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
};
