window.Utils = {
  pixelStringToBitmapData: function (options) {
	
  	noise.seed(options.seed ? options.seed : 0);
  	
  	var bitmapData = new Phaser.BitmapData(options.game, '', options.pixelString[0].split(' ').length, options.pixelString.length, true);
  	Phaser.Canvas.setSmoothingEnabled(bitmapData.ctx, false);

  	options.pixelString.forEach(function (row, y) {
  		row.split(' ').forEach(function (pixel, x) {
  			
  			// start out with a transparent pixel
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
  },
  updateMute: function (game, val) {
    if (window.localStorage.muted === undefined) window.localStorage.muted = false;
    if (typeof val === 'boolean') window.localStorage.muted = val;
    game.sound.mute = JSON.parse(window.localStorage.muted);
  }
};
