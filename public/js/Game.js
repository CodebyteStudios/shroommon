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
      create: this.create.bind(this)
    });
    
		this.game.state.add("Start", StartScreen);
		this.game.state.add("Game", GameScreen);
		this.game.state.add("Death", DeathScreen);
	},
  init: function () {
    var gameContainer = document.getElementById('game');
    gameContainer.style.width = STATE.WIDTH;
    gameContainer.style.height = STATE.HEIGHT;
  },
  create: function () {
    this.game.stage.backgroundColor = '#FFF';
    
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
 		this.game.physics.arcade.gravity.y = 300 * STATE.SCALE;
 		
 		this.game.state.start('Start');
 	}
};
