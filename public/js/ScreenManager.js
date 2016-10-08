window.ScreenManager = {
  _game: null,
  _screens: {},
  setup: function (game) {
    this._game = game;
  },
  add: function (name, screen) {
    if (this._screens[name]) return false;
    this._screens[name] = screen;
    return true;
  },
  remove: function () {
     if (!this._screens[name]) return false;
     delete this._screens[name];
     return true;
  },
  show: function (name) {
    if (!this._screens[name]) return false;
    this._screens.forEach(function (screen) {
      screen[screen.name == name ? 'show' : 'hide']();
    });
    return true;
  },
  update: function () {
    this._screens.some(function (screen) {
      if (screen.name == name) {
        screen.update();
        return true;
      }
    });
  }
};