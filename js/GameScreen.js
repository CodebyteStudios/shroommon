/* global Phaser GameState Player Enemy */

function GameScreen () {
  this._player = null;
  this._enemies = [];
  this._spawnTimer = 0;
}

GameScreen.prototype = {
  preload: function () {
    this.game.load.audio('walk', 'assets/walk.wav');
    this.game.load.audio('jump', 'assets/jump.wav');
    this.game.load.audio('smash', 'assets/smash.wav');
  },
  create: function () {
  	
  	this.game.stage.backgroundColor = 'rgba(' + GameState.get('COLORS.BACKGROUND').join(', ') + ')';
  	
  	// reset all the gameplay based states
  	GameState.set('SCORE', 0);
    GameState.set('KILLS', 0);
    GameState.set('ENEMY.STEP_SIZE', 2);
    GameState.set('ENEMY.STEP_DELAY', 50);
    GameState.set('ENEMY.SPAWN_DELAY', 1000);
  	
  	this._player = new Player(this.game, GameState.get('WIDTH') / 2, GameState.get('HEIGHT') / 2);
  	this._enemies = [];
  	
  	for (var i = 0; i < 10; i++) {
  	  var enemy = new Enemy(this.game);
      enemy.create(i);
      this._enemies.push(enemy);
  	}
  	
    this.game.input.keyboard.addKey(Phaser.Keyboard.P).onDown.add(function() {
      this.game.paused = (this.game.paused) ? false : true;
    }, this);
    
    this.game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(function() {
      Utils.updateMute(this.game, !this.game.sound.mute);
    }, this);

    this.score = this.game.add.bitmapText(
      10,
      10,
      'pixelated',
      'SCORE: ' + GameState.get('SCORE'),
      GameState.get('SCALE') * 10
    );
    
    this.kills = this.game.add.bitmapText(
      10,
      40,
      'pixelated',
      'KILLS: ' + GameState.get('KILLS'),
      GameState.get('SCALE') * 10
    );
  },
  update: function () {
    
    var self = this;
    
    if (this.game.time.now > this._spawnTimer) {
      this._enemies[Math.floor(Math.random() * this._enemies.length)].spawn();
      this._spawnTimer = this.game.time.now + GameState.get('ENEMY.SPAWN_DELAY');
    }
    
    self._player.update();
    
    var gameover = self._enemies.some(function (enemy) {
      
      var result = enemy.update(self._player);
      
      if (result == 'GAMEOVER') {
         return true;
      }
      else if (result == 'KILLED') {
        GameState.set('KILLS', GameState.get('KILLS') + 1);
        GameState.set('SCORE', GameState.get('SCORE') + (-enemy.body.height));
        GameState.increaseDifficulty();
        enemy.reset();
      }
      else if (result == 'BOUNCE') {
        self._player.bounce();
      }
    });
    
    if (gameover) {
      self._enemies.forEach(function (enemy) {
        enemy.reset();
      });
      self.game.state.start('Death');
    }
    
    this.score.text = 'SCORE: ' + GameState.get('SCORE');
    this.kills.text = 'KILLS: ' + GameState.get('KILLS');
  },
  render: function () {
    
    var self = this;
    
    if (GameState.get('DEBUG.BODIES')) {
      self.game.debug.body(self._player.sprite);
      self._enemies.forEach(function (enemy) {
        self.game.debug.body(enemy.head);
      });
    }
    else if (GameState.get('DEBUG.STATS')) { 
      self.game.debug.renderShadow = false;
      self.game.debug.text('STATE.SCORE: ' + GameState.get('SCORE'), 10, 20, 'black', 'bold 12px Arial');
      self.game.debug.text('STATE.KILLS: ' + GameState.get('KILLS'), 10, 40, 'black', 'bold 12px Arial');
      self.game.debug.text('STATE.ENEMY.STEP_SIZE: ' + GameState.get('ENEMY.STEP_SIZE'), 10, 60, 'black', 'bold 12px Arial');
      self.game.debug.text('STATE.ENEMY.STEP_DELAY: ' + GameState.get('ENEMY.STEP_DELAY'), 10, 80, 'black', 'bold 12px Arial');
      self.game.debug.text('STATE.ENEMY.SPAWN_DELAY: ' + GameState.get('ENEMY.SPAWN_DELAY'), 10, 100, 'black', 'bold 12px Arial');
    }
  }
}
