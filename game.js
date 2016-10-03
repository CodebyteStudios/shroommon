/*global PIXI*/

var renderer = new PIXI.WebGLRenderer(window.innerWidth, window.innerHeight, { backgroundColor : 0x0000000 });

var stage = new PIXI.Container();

document.body.appendChild(renderer.view);