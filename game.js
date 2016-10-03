var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.view);

var stage = new PIXI.Container();

var bunny = new PIXI.Sprite(PIXI.Texture.fromImage('sprite.png'));
    bunny.anchor.x = 0;
	bunny.anchor.y = 0;
    bunny.position.x = window.innerWidth / 2;
	bunny.position.y = window.innerHeight / 2;
	
var bunnyHeight = renderer.height / 20;
var bunnyWidth = renderer.width / 20;

stage.addChild(bunny);

animate();

function animate() {
    requestAnimationFrame(animate);
	renderer.render(stage);
}

document.addEventListener('keydown', onKeyDown);

function onKeyDown(key) {

  if (key.keyCode === 87) {
      if (bunny.position.y != 0) {
          bunny.position.y -= bunnyHeight;
      }
  }

  if (key.keyCode === 83) {
      if (bunny.position.y != renderer.height - bunnyHeight) {
          bunny.position.y += bunnyHeight;
      }
  }

  if (key.keyCode === 65) {
      if (bunny.position.x != 0) {
          bunny.position.x -= bunnyWidth;
      }
  }

  if (key.keyCode === 68) {
      if (bunny.position.x != renderer.width - bunnyWidth) {
          bunny.position.x += bunnyWidth;
      }
  }
  
}