window.EnemyManager = {
  _game: null,
  _spawnTimer: 0,
  _enemies: [],
  _enemySprites: [],
  _textures: { body: null, pool: [] },
  setup: function (game) {
    this._game = game;
    // create 10 enemies
    for (var i = 0; i < 10; i++) {
      var enemy = new Enemy(this._game);
      enemy.create(i);
      this._enemies.push(enemy);
    }
  },
  bodyTexture: function () {
    if (this._textures.body) {
      return this._textures.body;
    }
    else {
      
      var colors = { background: STATE.COLORS.BACKGROUND, outline: STATE.COLORS.OUTLINE, perlin: STATE.COLORS.ENEMY_CAP };
  		var noise = { offset: { x: 20, y: 10 }, threshold: 0.5, swap: false };
  		
  		this._textures.body = Utils.pixelStringToBitmapData({
  			game: this._game,
  			scale: STATE.SCALE,
  			seed: Math.random(),
  			pixelString: PixelStrings.enemyBody,
  			colors: colors,
  			noise: noise
  		});
      
      return this._textures.body;
    }
  },
  randomTexture: function () {
    if (this._textures.pool.length > STATE.ENEMY.MAX_TEXTURES) {
      return this._textures.pool[Math.floor(Math.random() * this._textures.pool.length)];
    }
    else {
      
      var colors = { background: STATE.COLORS.BACKGROUND, outline: STATE.COLORS.OUTLINE, perlin: STATE.COLORS.ENEMY_CAP };
  		var noise = { offset: { x: 20, y: 10 }, threshold: 0.5, swap: false };
  		
  		var texture = Utils.pixelStringToBitmapData({
  			game: this._game,
  			scale: STATE.SCALE,
  			seed: Math.random(),
  			pixelString: PixelStrings.enemyCap,
  			colors: colors,
  			noise: noise
  		});
  		
  		this._textures.pool.push(texture);
      
      return texture;
    }
  },
  update: function (player) {
    
    if (this._game.time.now > this._spawnTimer) {
      this._enemies[Math.floor(Math.random() * this._enemies.length)].alive = true;
      this._spawnTimer = this._game.time.now + STATE.ENEMY.SPAWN_DELAY;
    }
    
    this._enemies.forEach(function (enemy) {
      enemy.update(player);
    });
  },
  killedOne: function () {
    STATE.ENEMY.STEP_DELAY--;
    STATE.ENEMY.SPAWN_DELAY -= 10;
    if (STATE.ENEMY.STEP_DELAY < 5) STATE.ENEMY.STEP_DELAY = 5;
    if (STATE.ENEMY.SPAWN_DELAY < 0) STATE.ENEMY.SPAWN_DELAY = 0;
  }
};