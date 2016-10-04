(function() {
	var renderer = PIXI.autoDetectRenderer(160, 144);
	document.body.appendChild(renderer.view);
	
	var stage = new PIXI.Container();
	
	var boxWidth = renderer.width / 20;
	var boxHeight = renderer.height / 20;
	
	var bg = new PIXI.Sprite(PIXI.Texture.fromImage('bg.png'));
	stage.addChildAt(bg, 0);

	var bunny = new PIXI.Sprite(PIXI.Texture.fromImage('sprite.png'));
		bunny.position.y = 65;
	
	stage.addChild(bunny);
	
	document.addEventListener('keydown', keyboard);
	
	(function animate() {
		renderer.render(stage);
		requestAnimationFrame(animate);
	})()
	
	function keyboard(key) {
		// Forward
		if (key.keyCode === 87 || key.keyCode === 38) {
			if (bunny.position.x != renderer.width - boxWidth) {
				bunny.position.x += boxWidth;
			}
		}
		
		// Backward
		if (key.keyCode === 83 || key.keyCode === 40) {
			if (bunny.position.x != 0) {
				bunny.position.x -= boxWidth;
			}
		}
		
		// Jump
		if (key.keyCode === 32) {
			if (bunny.position.y != 0) {
				bunny.position.y -= boxHeight;
				setTimeout(function () {
					bunny.position.y += boxHeight;
				}, 500);
			}
		}
	}

})();