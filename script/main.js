//main
//https://javascript.info/class-inheritance
//https://dev.to/nitdgplug/learn-javascript-through-a-game-1beh
//https://www.minifier.org/
//https://xem.github.io/articles/jsgamesinputs.html
//https://xem.github.io/js13k-pack/

var fps = 60;

var rf = (function(){
  return requestAnimationFrame    ||
      webkitRequestAnimationFrame ||
      mozRequestAnimationFrame    ||
      oRequestAnimationFrame      ||
      msRequestAnimationFrame     ||
      function(cb){
          setTimeout(cb, 1000 / fps);
      };
})();

var Mob = window.ontouchstart !== undefined;


var lastTime;
var now;
var dt = 0;
var slowMo = 1;
var step = 1 / fps;
var sStep = slowMo * step;

var GAME;
var GFX, SFX;
var MAP;
var AUDIO;
var MUSIC;

var ctx;//
/*****************************/
function Start(canvasBody)
{	
	
	// Create the canvas
	var canvas = document.createElement("canvas");
	if(canvas.getContext)
	{
		ctx = canvas.getContext("2d");
		canvas.width = (DEF.map.size.screen.width * DEF.map.size.tile.width);
		canvas.height = (DEF.map.size.screen.height * DEF.map.size.tile.height);

		var b = document.getElementById(canvasBody);
    	b.appendChild(canvas);
		
		MAP = new MapManger(ctx, DEF);

		MUSIC = new ShitMusic();
		AUDIO = new TinySound(SOUNDS);

		//offscreen renderer
		GFX = new Render(MAP.osCanvas.ctx);	

		SFX = new Render(MAP.screenCtx, DEF.map.size.screen.width* DEF.map.size.tile.width, 
			DEF.map.size.screen.height* DEF.map.size.tile.height);	

		Input.Init(canvas, Mob, SFX,['#000','#999'],0);

		preInit();
	}
}

function preInit(){
	init();
}

function init()
{  
  	var now = timestamp();	
	lastTime = now;

	GAME = new Game(Mob);
	
	FixedLoop();  
}

// function SlowMo(mo){
// 	sStep = mo * step;
// }

function FixedLoop(){
	if(Input.IsSingle('Escape') ) {
		GAME.Pause();
	}

	now = timestamp();
	dt = dt + Math.min(1, (now - lastTime) / 1000);
	while (dt > sStep) {
	  dt = dt - sStep;
	  update(step);
	}

	render();
				
	lastTime = now;
	rf(FixedLoop);
}

function timestamp() {
	var wp = performance;
	return wp && wp.now ? wp.now() : new Date().getTime();
}

// Update game objects
function update(dt) {
	GAME.Update(dt);
};

function render() {
	GAME.Render();
};

onkeydown = function(e)
{
	e.preventDefault();
    Input.Pressed(e, true);
};

onkeyup = function(e)  {
	e.preventDefault();
    Input.Pressed(e, false);
    Input.Released(e, true);
};

onblur = function(e)  {
	e.preventDefault();
    Input.pressedKeys = {};
};

onload = function() {
	Start("cb");
}

