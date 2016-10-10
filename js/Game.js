// The idea of this game is that your a mushroom, trying to smash all the other 
// mushrooms, which are constantly growing taller. The taller the mushrooms grow, the 
// more you get for smashing them, but you'll need to bounce off of the shorter mushrooms
// to reach the taller mushrooms. If a mushroom reaches the top of the screen, you lose

this.Game = {
  game: null,
  setup: function () {
    this.game = new Phaser.Game(GameState.get('WIDTH'), GameState.get('HEIGHT'), Phaser.AUTO, 'game', {
      init: this.init.bind(this),
      preload: this.preload.bind(this),
      create: this.create.bind(this)
    });
		this.game.state.add("Loading", LoadingScreen);
		this.game.state.add("Start", StartScreen);
		this.game.state.add("Game", GameScreen);
		this.game.state.add("Death", DeathScreen);
	},
	init: function () {
    var gameContainer = document.getElementById('game');
    gameContainer.style.width = GameState.get('WIDTH');
    gameContainer.style.height = GameState.get('HEIGHT');
  },
  preload: function () {
    
  },
  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 300 * GameState.get('SCALE');
    this.game.state.start('Loading');
    Utils.updateMute(this.game);
 	}
};
