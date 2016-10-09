window.GameState = {
  _values: {},
  _defaults: {},
  // set the value
  set: function (key, value) {
    this._values[key] = value;
  },
  // get a value
  get: function (key) {
    if (this._values[key] !== undefined) {
      return this._values[key];
    }
    if (this._defaults[key] !== undefined) {
      return this._defaults[key];
    }
  },
  // delete the value, forcing the default to be used
  reset: function (key) {
    delete this._values[key];
  },
  // sets the default for a key
  default: function (key, value) {
    this._defaults[key] = value;
  }
};

// the difficulty algorithm
GameState.increaseDifficulty = function () {
  GameState.set('ENEMY.STEP_DELAY', GameState.get('ENEMY.STEP_DELAY') - 1);
  GameState.set('ENEMY.SPAWN_DELAY', GameState.get('ENEMY.SPAWN_DELAY') - 10);
  if (GameState.get('ENEMY.STEP_DELAY') < 5) GameState.set('ENEMY.STEP_DELAY', 5);
  if (GameState.get('ENEMY.SPAWN_DELAY') < 0) GameState.set('ENEMY.SPAWN_DELAY', 0);
};

/* set all the defaults */
GameState.default('SCALE', 3);
[
  ['WIDTH', 160 * GameState.get('SCALE')],
  ['HEIGHT', 144 * GameState.get('SCALE')],
  ['SCORE', 0],
  ['KILLS', 0],
  ['DEBUG.BODIES', false],
  ['DEBUG.STATS', true],
  ['ENEMY.MAX_TEXTURES', 20],
  ['ENEMY.STEP_SIZE', 2],
  ['ENEMY.STEP_DELAY', 50],
  ['ENEMY.SPAWN_DELAY', 1000],
  ['PLAYER.X_SPEED', 25],
  ['PLAYER.JUMP_POWER', 250],
  ['PLAYER.SMASH_POWER', 200],
  ['PLAYER.DRAG_GROUNDED', 2500],
  ['PLAYER.DRAG_AIRBORNE', 750],
  ['PLAYER.MAX_BOUNCE_POWER', 3],
  ['PLAYER.ROTATION_SPEED', 15]
].forEach(function (keyValue) {
  GameState.default(keyValue[0], keyValue[1]);
});

(function (colorscheme) {
  switch (colorscheme) {
    case 'happy': {
      GameState.default('COLORS.BACKGROUND', [255, 255, 255, 255]);
      GameState.default('COLORS.OUTLINE', [0, 0, 0, 255]);
      GameState.default('COLORS.PLAYER_CAP', [0, 255, 0, 255]);
      GameState.default('COLORS.ENEMY_CAP', [255, 0, 0, 255]);
    } break;
    case 'depressing': {
      GameState.default('COLORS.BACKGROUND', [222, 137, 190, 255]);
      GameState.default('COLORS.OUTLINE', [9, 8, 9, 255]);
      GameState.default('COLORS.PLAYER_CAP', [2, 195, 154, 255]);
      GameState.default('COLORS.ENEMY_CAP', [195, 247, 58, 255]);
    } break;
  }
})('happy');