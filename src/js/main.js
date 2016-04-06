;(function (app) { 'use strict';

var canvas = document.getElementById('maincanvas'),
	cnv_width  = canvas.width,
	cnv_height = canvas.height,
	spacingCount = 0,
	shapeColors = [
		['rgb(255,255,255)'],  // None
		['rgb(0,0,255)', 'rgb(0,0,128)', 'rgb(0,50,200)', '#5463e7'],  // Marine
		['#f4da46', '#e9cb52', '#fbe384', '#ffe391', '#fcef94', '#fff200'],  // Gold
		['rgba(243,33,33,1,.75)', 'rgba(248,120,120,.75)', 'rgba(250,156,156,.75)', 'rgba(222,107,107,.75)'],  // Ruby
		['rgba(176,187,223,.5)', 'rgba(30,210,179,.5)', 'rgba(166,227,234,.5)'],  // Watercolor
		['#98ff75', '#a4f898', '#97f0b6', '#6ae680', '#8dde72', '#32e251'],  // Grass
		{seq:['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000']}  // Rainbow
	],
	keys = {
		up   : false,
		down : false,
		left : false,
		right: false
	},
	velocity = {
		x: 0,
		y: 0
	},
	ctx, cnvRect, posX, posY, fill_clear, effectFunc, shapeFunc, rafId;
// Constants
var Round      = Math.round,
	KEY_LEFT   = 37,
	KEY_UP     = 38,
	KEY_RIGHT  = 39,
	KEY_DOWN   = 40,
	KEY_P      = 80,
	KEY_S      = 83,
	KEY_CMD_S  = 19;  // OS X webkit browsers

app.utils.eventDecorator(app);

function start() {
	app._canvas = canvas;
	app._ctx = ctx;
	app.settings
		.on('app:change', optionsChanged)
		.init();
	posX = cnv_width/2 | 0;
	posY = cnv_height/2 | 0;
	// canvas.addEventListener('mousemove', app.utils.throttle(mouseListener, 50));
	canvas.addEventListener('mousemove', mouseListener);
	canvas.addEventListener('dblclick', mouseListener);
	window.addEventListener('keydown', keyboardListener, false);
	window.addEventListener('keyup', keyboardListener, false);
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();	
	draw();
}

function resizeCanvas() {
	var rect = canvas.getBoundingClientRect();
	cnvRect = {
		top   : rect.top | 0,
		right : rect.right | 0,
		bottom: rect.bottom | 0,
		left  : rect.left | 0
	};
}

function mouseListener(e) {
	if(e.type === 'mousemove') {
		if(app.options.mouse) {
			posX = e.clientX - cnvRect.left;
			posY = e.clientY - cnvRect.top;	
		}		
	}
	else if(e.type === 'dblclick') {
		app.pause(true);
	}
}

function keyboardListener(e) {
	var pressed = e.type === 'keydown';
	if(!app.options.mouse) {
		if     (e.keyCode === KEY_UP)    keys.up = pressed;
		else if(e.keyCode === KEY_DOWN)  keys.down = pressed;
		else if(e.keyCode === KEY_LEFT)  keys.left = pressed;
		else if(e.keyCode === KEY_RIGHT) keys.right = pressed;
	}
	
	if(pressed) {
		// Capture Ctrl + S		
		if(e.keyCode === KEY_S && (e.ctrlKey || e.metaKey) || e.keyCode === KEY_CMD_S) {
			e.preventDefault();
			app.saveAsImage();
			return false;
		}
		else if(e.keyCode == KEY_P) {
			app.pause(true);
		}
	}
}

function optionsChanged(name, val) {
	console.info("Option changed: ", name, val);
	if(name === 'reverse') {
		app.options.dir = val ? -1 : 1;		
	}
	else if(name === 'effect') {
		effectFunc = app.effects.getById(val);
	}
	else if(name === 'shape') {
		shapeFunc = app.shapes.getById(val);
	}
	else if(name === 'ghost') {
		if(app.options.ghost < 10) {
			var ghostVal = 10 - app.options.ghost;
			fill_clear = 'rgba(0,0,0,.0' + ghostVal + ')';
		}
		else {
			fill_clear = false;
		}
	}
	else if(name === 'dispersion' || name === 'size'){
		app.options.dispersionSize = app.options.dispersion * Math.max(app.options.size / 10, 1);
	}
}

function draw() {
	if(!app.options.mouse) {
		moveCursorByKeys();
	}	
	if(!app.options.spacing || spacingCount++ % app.options.spacing === 0) {
		drawShape(posX, posY);		
	}
	ctx.save();
	effectFunc();
	ctx.restore();
	if(fill_clear) {		
		ctx.fillStyle = fill_clear;
		ctx.fillRect(0, 0, cnv_width, cnv_height);
	}	
	rafId = window.requestAnimationFrame(draw);
}

function drawShape(x, y) {
	var sz = app.options.size,
		col = getColor(app.options.color),
		v = app.options.variation,
		d = app.options.dispersionSize;
	if(v > 0) {
		sz += Round(app.utils.randomInt(0, v) - v/2);
		if(sz < 1) {
			sz = 1;
		}
	}
	if(d > 0) {
		x += Round(app.utils.randomInt(0, d) - d/2);
		y += Round(app.utils.randomInt(0, d) - d/2);
	}	
	ctx.fillStyle   = col;
	ctx.strokeStyle = col;
	ctx.lineWidth   = app.utils.randomInt(1, 4);
	shapeFunc(x, y, sz);
}

function getColor(col) {
	var colorset = shapeColors[col],
		rint = app.utils.randomInt;
	if(col === -1) {
		return 'rgb(' + rint(255) + ',' + rint(255) + ',' + rint(255) + ')';
	}
	else {
		if(colorset.seq) {
			colorset.count = colorset.count + 1 || 0;
			if(colorset.count >= colorset.seq.length) {
				colorset.count = 0;
			}
			return colorset.seq[colorset.count];
		}
		return colorset[rint(colorset.length-1)];
	}	
}

function moveCursorByKeys() {	
	if     (keys.up)    velocity.y -= 1;
	else if(keys.down)  velocity.y += 1;
	if     (keys.left)  velocity.x -= 1;
	else if(keys.right) velocity.x += 1;
	
	if(velocity.x > .001 || velocity.x < -.001 || velocity.y > .001 || velocity.y < -.001) {
		velocity.x /= 1.1;
		velocity.y /= 1.1;	
		posX += velocity.x;
		posY += velocity.y;	
		if     (posX < 0)          posX = 0;
		else if(posX > cnv_width)  posX = cnv_width;
		if     (posY < 0)          posY = 0;
		else if(posY > cnv_height) posY = cnv_height;
	}
}

// Public methods
app.saveAsImage = function(type, encoderOptions) {
	app.pause();
	
	var exportCanvas = document.createElement('canvas'),
		exportCtx = exportCanvas.getContext('2d');
	type = type || 'image/png';
		
	exportCanvas.width = cnv_width;
	exportCanvas.height = cnv_height;
	exportCtx.fillStyle = '#000';
	exportCtx.fillRect(0, 0, cnv_width, cnv_height);
	exportCtx.drawImage(canvas, 0, 0);
	window.open(exportCanvas.toDataURL(type, encoderOptions));
	
	app.resume();
};

app.pause = function(toggle) {
	if(rafId) {
		cancelAnimationFrame(rafId);
		rafId = undefined;
		app.trigger('app:pause');
	}
	else if(toggle) {
		app.resume();
	}
};

app.resume = function() {
	if(!rafId) {
		draw();
		app.trigger('app:resume');
	}
};


// App start
document.addEventListener('DOMContentLoaded', function(){
	if(canvas.getContext){
		ctx = canvas.getContext('2d');
		start();
	} else {
		// canvas-unsupported code here
	}
});

}(window.app || (window.app = {})));