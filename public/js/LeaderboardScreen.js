function LeaderboardScreen () {
  this.title = "Leaderboards";
}

LeaderboardScreen.prototype.create = function () {
  this.game.add.text(0, 0, this.title, {
    font: 'bold 35px pixelated',
    fill: '#00000'
  });
}