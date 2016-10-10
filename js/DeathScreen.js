/* global fetch Phaser GameState */

function DeathScreen () {}

DeathScreen.prototype.create = function () {
  
  this.game.stage.backgroundColor = 'rgba(' + GameState.get('COLORS.BACKGROUND').join(', ') + ')';
  
  var offsetX = 100;
  var offsetY = 160;
  
  this.title = this.game.add.bitmapText(
    this.game.world.centerX,
    this.game.world.centerY - offsetY,
    'pixelated',
    'GAME OVER',
    GameState.get('SCALE') * 20
  );
  this.title.anchor.set(0.5);
  
  this.scoreAndKills = this.game.add.bitmapText(
    this.game.world.centerX,
    this.game.world.centerY + 65 - offsetY,
    'pixelated',
    'SCORE OF ' + GameState.get('SCORE') + ' FROM ' + GameState.get('KILLS') + ' KILLS',
    GameState.get('SCALE') * 10
  );
  this.scoreAndKills.anchor.set(0.5);
  
  this.leaderBoard = {
    names: this.game.add.bitmapText(
      offsetX,
      this.game.world.centerY + 100 - offsetY,
      'pixelated',
      'NAME',
      GameState.get('SCALE') * 10
    ),
    kills: this.game.add.bitmapText(
      offsetX + 100,
      this.game.world.centerY + 100 - offsetY,
      'pixelated',
      'KILLS',
      GameState.get('SCALE') * 10
    ),
    scores: this.game.add.bitmapText(
      offsetX + 200,
      this.game.world.centerY + 100 - offsetY,
      'pixelated',
      'SCORE',
      GameState.get('SCALE') * 10
    )
  }
  
  this.error = this.game.add.bitmapText(
    GameState.get('WIDTH') / 2,
    this.game.world.centerY + 140 - offsetY,
    'pixelated',
    "",
    GameState.get('SCALE') * 10
  );
  this.error.anchor.set(0.5, 0);
  this.error.visible = false;
  
  this.pressSpaceToDoAction = this.game.add.bitmapText(
    this.game.world.centerX,
    this.game.world.centerY + 350 - offsetY,
    'pixelated',
    'PRESS R TO RESTART / S TO SUBMIT',
    GameState.get('SCALE') * 10
  );
  this.pressSpaceToDoAction.anchor.set(0.5);
  
  this.game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(function() {
    Utils.updateMute(this.game, !this.game.sound.mute);
  }, this);
  
  this.game.input.keyboard.addKey(Phaser.Keyboard.R).onDown.addOnce(function () {
    this.game.state.start('Game');
  }, this);
  
  this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.addOnce(function () {
    this.submitScore();
  }, this);
  
  this._hideTimer = this.game.time.now + 500;
  
  this.fetchScores();
}

DeathScreen.prototype.update = function () {
  if (this.game.time.now > this._hideTimer) {
    this.pressSpaceToDoAction.visible = !this.pressSpaceToDoAction.visible;
    this._hideTimer = this.game.time.now + 500;
  }
}

DeathScreen.prototype.fetchScores = function () {
  
  var self = this;
  
  fetch('https://shroommon-145922.firebaseio.com/leaderboards.json?limitToLast=5&orderBy="score"', {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  // parse JSON
  .then(function (response) {
    return response.json();
  })
  // parse the resulting object, and update the UI
  .then(function (entries) {
    
    var resultingTexts = { names: 'NAME\n', kills: 'KILLS\n', scores: 'SCORE\n' };
    
    // firebase passes us back an object,
    // which we need to convert to an array and sort
    Object.keys(entries)
      // convert the object to an array
      .reduce(function (arr, key) {
        arr.push(entries[key]);
        return arr;
      }, [])
      // sort by largest score
      .sort(function (a, b) {
        return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
      })
      // add each entry to the UI
      .forEach(function (entry) {
        resultingTexts.names += entry.name + '\n'
        resultingTexts.kills += entry.kills + '\n'
        resultingTexts.scores += entry.score + '\n'
      });
      
      self.leaderBoard.names.visible = true;
      self.leaderBoard.kills.visible = true;
      self.leaderBoard.scores.visible = true;
      self.error.visible = false;
      self.leaderBoard.names.text = resultingTexts.names;
      self.leaderBoard.kills.text = resultingTexts.kills;
      self.leaderBoard.scores.text = resultingTexts.scores;
  })
  // oh noes something happened :(
  .catch(function (err) {
    self.showError(
      "Oh no.. we couldn't fetch the\n" +
      "latest scores.. make sure you're\n" +
      "connected to the internet! :)"
    );
  });
}

DeathScreen.prototype.submitScore = function () {
  
  var name = window.prompt('Please enter a 3 letter name', '');
  
  if (name) {
    
    var self = this;
    
    fetch('https://wt-codebytestudios-gmail-com-0.run.webtask.io/shroommon', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name.substr(0, 3).toUpperCase(),
        score: GameState.get('SCORE'),
        kills: GameState.get('KILLS')
      })
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      self.pressSpaceToDoAction.text = "PRESS R TO RESTART";
      window.setTimeout(function () {
        self.fetchScores();
      }, 500);
    })
    .catch(function (err) {
      self.showError(
        "Oh no.. we failed to submit\n" +
        "your score, make sure you're\n" +
        "connected to the internet! :)"
      );
      self.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.addOnce(function () {
        self.submitScore();
      }, self);
    });
  }
  else {
    this.showError("Please input a name if you\n want to submit your score :)");
    this.game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.addOnce(function () {
      this.submitScore();
    }, this);
  }
}

DeathScreen.prototype.showError = function (message) {
  this.leaderBoard.names.visible = false;
  this.leaderBoard.kills.visible = false;
  this.leaderBoard.scores.visible = false;
  this.error.visible = true;
  this.error.text = message;
}