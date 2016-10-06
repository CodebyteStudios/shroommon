/* global Phaser noise */

/* Shroom Mon (or another cooler name) */

// The idea of this game is that your a mushroom, trying to smash all the other 
// mushrooms, which are constantly growing taller. The taller the mushrooms grow, the 
// more you get for smashing them, but you'll need to bounce off of the shorter mushrooms
// to reach the taller mushrooms. If a mushroom reaches the top of the screen, you lose

// Check out idea.png for what I'm thinking the game should look like.

var PixelStringMaps = {
	playerIdle: [
		". . . . . . . . . O O O O O O . . . . . . . . .",
		". . . . . . . O O P P P P P P O O . . . . . . .",
		". . . . . . O P P P P P P P P P P O . . . . . .",
		". . . . . O P P P P P P P P P P P P O . . . . .",
		". . . . . O P P P P P P P P P P P P O . . . . .",
		". . . . O O P P P P P P P P P P P P O O . . . .",
		". . . . O P P P P P P P P P P P P P P O . . . .",
		". . . . O P P P P P P P P P P P P P P O . . . .",
		". . . . O P P P P P P P P P P P P P P O . . . .",
		". . . . O P P P P P P P P P P P P P P O . . . .",
		". . . . . O P P P O O O O O O O P P O . . . . .",
		". . . . . . O O O O B B B B B B O O O . . . . .",
		". . . . . . . O B B B O B B O B O . . . . . . .",
		". . . . . . . O B B B O B B O B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		". . . . . . . O O O O O O O O O O . . . . . . .",
		". . . . . . . O . . . . . . . . O . . . . . . .",
		". . . . . . . O . . . . . . . . O . . . . . . .",
		". . . . . . . O . . . . . . . . O . . . . . . .",
		". . . . . . . O . . . . . . . . O . . . . . . .",
		". . . . . . . O . . . . . . . . O . . . . . . .",
		". . . . . . . O . . . . . . . . O . . . . . . .",
		". . . . . . . O . . . . . . . . O . . . . . . ."
	],
	playerRunning: [
		". . . . . . . . . O O O O O O . . . . . . . . .",
		". . . . . . . O O P P P P P P O O . . . . . . .",
		". . . . . . O P P P P P P P P P P O . . . . . .",
		". . . . . O P P P P P P P P P P P P O . . . . .",
		". . . . . O P P P P P P P P P P P P O . . . . .",
		". . . . O O P P P P P P P P P P P P O O . . . .",
		". . . . O P P P P P P P P P P P P P P O . . . .",
		". . . . O P P P P P P P P P P P P P P O . . . .",
		". . . . O P P P P P P P P P P P P P P O . . . .",
		". . . . O P P P P P P P P P P P P P P O . . . .",
		". . . . . O P P P O O O O O O O P P O . . . . .",
		". . . . . . O O O O B B B B B B O O O . . . . .",
		". . . . . . . O B B B O B B O B O . . . . . . .",
		". . . . . . . O B B B O B B O B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		". . . . . . . O B B B B B B B B O . . . . . . .",
		"O O O O O O O O O O O O O O O O O O O O O O O O",
		". . . . . . . . . . . . . . . . . . . . . . . .",
		". . . . . . . . . . . . . . . . . . . . . . . .",
		". . . . . . . . . . . . . . . . . . . . . . . .",
		". . . . . . . . . . . . . . . . . . . . . . . .",
		". . . . . . . . . . . . . . . . . . . . . . . .",
		". . . . . . . . . . . . . . . . . . . . . . . .",
		". . . . . . . . . . . . . . . . . . . . . . . ."
	],
	enemyCap: [
		". . . . . O O O O O O . . . . .",
		". . . O O P P P P P P O O . . .",
		". . O P P P P P P P P P P O . .",
		". O P P P P P P P P P P P P O .",
		". O P P P P P P P P P P P P O .",
		"O O P P P P P P P P P P P P O O",
		"O P P P P P P P P P P P P P P O",
		"O P P P P P P P P P P P P P P O",
		"O P P P P P P P P P P P P P P O",
		"O P P P P P P P P P P P P P P O",
		". O P P P O O O O O O P P P O .",
		". . O O O B O B B O B O O O . .",
		". . . O B B O B B O B B O . . ."
	],
	enemyBody: [
		". . . O B B B B B B B B O . . ."
	]
};

var Colors = {
	background: [255, 255, 255, 255],
	outline: [0, 0, 0, 255],
	playerCap: [0, 255, 0, 255],
	enemeyCap: [255, 0, 0, 255]
};

var playerImage;

function renderPixelStringBitmapData (options) {
	
	noise.seed(options.seed ? options.seed : 0);
	
	var bitmapData = new Phaser.BitmapData(options.game, '', options.pixelStringMap[0].split(' ').length, options.pixelStringMap.length, true);
	Phaser.Canvas.setSmoothingEnabled(bitmapData.ctx, false);
	
	options.pixelStringMap.forEach(function (row, y) {
		row.split(' ').forEach(function (pixel, x) {
			
			// start out with a 
			var color = [0, 0, 0, 0];
			
			// use the background color
			if (pixel == 'B') color = options.colors.background;
			
			// use the outline color
			if (pixel == 'O') color = options.colors.outline;
			
			// use perlin noise (generate unique mushroom cap spots each time :D)
			if (pixel == 'P') {
				if (noise.perlin2((1 / (x + 1)) * options.noise.offset.x, (1 / (y + 1)) * options.noise.offset.y) + 0.5 > options.noise.threshold)
					color = options.noise.swap ? options.colors.perlin : options.colors.background;
				else
					color = options.noise.swap ? options.colors.background : options.colors.perlin;
			}
			
			bitmapData.setPixel32(x, y, color[0], color[1], color[2], color[3]);
		});
	});
	
	var bitmapDataScaled = new Phaser.BitmapData(game, '', bitmapData.width * options.scale, bitmapData.height * options.scale, true);
	Phaser.Canvas.setSmoothingEnabled(bitmapDataScaled.ctx, false);
	bitmapDataScaled.draw(bitmapData, 0, 0, bitmapData.width * options.scale, bitmapData.height * options.scale, true);
	
	bitmapData.destroy();
	
	return bitmapDataScaled;
}

var GAME_SCALE = 3;

var Game = {
	width: 160 * GAME_SCALE,
	height: 144 * GAME_SCALE,
	player: null,
	animTimer: 0,
	jumpTimer: 0,
	playerTextures: null
};

Game.game = new Phaser.Game(Game.width, Game.height, Phaser.AUTO, 'game', {
	init: function () {
		var gameContainer = document.getElementById('game');
		gameContainer.style.width = Game.width;
		gameContainer.style.height = Game.height;
	},
	preload: function () {},
	create: function () {
	
		var playerRenderSeed = Math.random();
	
		Game.playerTextures = {
			idle: renderPixelStringBitmapData({
				game: Game.game,
				scale: GAME_SCALE,
				seed: playerRenderSeed,
				pixelStringMap: PixelStringMaps.playerIdle,
				colors: {
					background: Colors.background,
					outline: Colors.outline,
					perlin: Colors.playerCap
				},
				noise: {
					offset: { x: 20, y: 10 },
					threshold: 0.5,
					swap: false
				}
			}),
			running: renderPixelStringBitmapData({
				game: Game.game,
				scale: GAME_SCALE,
				seed: playerRenderSeed,
				pixelStringMap: PixelStringMaps.playerRunning,
				colors: {
					background: Colors.background,
					outline: Colors.outline,
					perlin: Colors.playerCap
				},
				noise: {
					offset: { x: 20, y: 10 },
					threshold: 0.5,
					swap: false
				}
			})
		};
	
		Game.game.stage.backgroundColor = '#2d2d2d';
	
		Game.game.physics.startSystem(Phaser.Physics.ARCADE);
	
		Game.game.physics.arcade.gravity.y = 300 * GAME_SCALE;

		Game.player = Game.game.add.sprite(Game.width / 2, Game.height / 2, Game.playerTextures.idle);
		Game.player.anchor.set(0.5, 0.5);
		
		Game.game.physics.enable([Game.player], Phaser.Physics.ARCADE);
		
		Game.player.body.collideWorldBounds = true;
		Game.player.body.gravity.y = 500 * GAME_SCALE;
		Game.player.body.maxVelocity.y = 250 * GAME_SCALE;
	},
	update: function () {
		
		var moving = false;
		
		Game.player.body.velocity.x = 0;

		if (Game.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			Game.player.body.velocity.x -= 150 * GAME_SCALE;
			Game.player.scale.x = -1;
			moving = true;
		}
		
		if (Game.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			Game.player.body.velocity.x += 150 * GAME_SCALE;
			Game.player.scale.x = 1;
			moving = true;
		}
		
		if (Game.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && Game.player.body.onFloor() && Game.game.time.now > Game.jumpTimer) {
			Game.player.body.velocity.y = -400 * GAME_SCALE;
			Game.jumpTimer = Game.game.time.now + 250;
		}
		
		if (moving && Game.player.body.onFloor()) {
			if (Game.game.time.now > Game.animTimer) {
				Game.player.loadTexture(Game.player.texture === Game.playerTextures.idle.texture ? Game.playerTextures.running : Game.playerTextures.idle.texture);
				Game.animTimer = Game.game.time.now + 200;
			}
		} else {
			Game.player.loadTexture(Game.playerTextures.idle);
		}
		
	}
});