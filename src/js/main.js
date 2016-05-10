;(function (app) { 'use strict';

var canvas = document.getElementById('maincanvas'),
	spacingCount = 0,
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
	ctx, fill_clear, effectFunc, shapeFunc, rafId, state;
// Constants
var KEY_LEFT   = 37,
	KEY_UP     = 38,
	KEY_RIGHT  = 39,
	KEY_DOWN   = 40;

app.utils.eventDecorator(app);

function start() {
	app.canvas = app.Canvas(canvas, ctx);
	app.options = {};
	app.settings = new app.Settings('.settings');
	app.settings
		.on('app:change', optionsChanged)
		.init();
	app.cursor = {
		x: app.canvas.intWidth/2  | 0,
		y: app.canvas.intHeight/2 | 0
	};
	window.addEventListener('keydown', keyboardListener, false);
	window.addEventListener('keyup', keyboardListener, false);
	draw();
	setState('running');
}

function keyboardListener(e) {
	var pressed = e.type === 'keydown';
	if(!app.options.mouse) {
		if     (e.keyCode === KEY_UP)    keys.up = pressed;
		else if(e.keyCode === KEY_DOWN)  keys.down = pressed;
		else if(e.keyCode === KEY_LEFT)  keys.left = pressed;
		else if(e.keyCode === KEY_RIGHT) keys.right = pressed;
	}	
	app.trigger('app:'+e.type, e);
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
		canvas.drawShape(app.cursor.x, app.cursor.y, shapeFunc);
	}
	effectFunc();
	if(fill_clear) {		
		ctx.fillStyle = fill_clear;
		ctx.fillRect(0, 0, app.canvas.intWidth, app.canvas.intHeight);
	}	
	rafId = window.requestAnimationFrame(draw);
}

function moveCursorByKeys() {	
	if     (keys.up)    velocity.y -= 1;
	else if(keys.down)  velocity.y += 1;
	if     (keys.left)  velocity.x -= 1;
	else if(keys.right) velocity.x += 1;
	
	if(velocity.x > .001 || velocity.x < -.001 || velocity.y > .001 || velocity.y < -.001) {
		velocity.x /= 1.1;
		velocity.y /= 1.1;	
		app.cursor.x += velocity.x;
		app.cursor.y += velocity.y;	
		if     (app.cursor.x < 0)          app.cursor.x = 0;
		else if(app.cursor.x > app.canvas.intWidth)  app.cursor.x = app.canvas.intWidth;
		if     (app.cursor.y < 0)          app.cursor.y = 0;
		else if(app.cursor.y > app.canvas.intHeight) app.cursor.y = app.canvas.intHeight;
	}
}

function setState(newState) {
	state = newState;
}


// Public methods
app.toDataURL = function(type, encoderOptions) {
	var isRunning = (state === 'running');
	if(isRunning) {
		app.pause();		
	}
	
	var exportCanvas = document.createElement('canvas'),
		exportCtx = exportCanvas.getContext('2d');
	type = type || 'image/png';
		
	exportCanvas.width = app.canvas.intWidth;
	exportCanvas.height = app.canvas.intHeight;
	exportCtx.fillStyle = '#000';
	exportCtx.fillRect(0, 0, app.canvas.intWidth, app.canvas.intHeight);
	exportCtx.drawImage(canvas, 0, 0);
	
	if(isRunning) {
		app.resume();
	}
	
	return exportCanvas.toDataURL(type, encoderOptions);
};

app.pause = function(toggle) {
	if(state === 'running') {
		window.cancelAnimationFrame(rafId);
		rafId = undefined;
		setState('paused');
		app.trigger('app:pause');
	}
	else if(toggle) {
		app.resume();
	}
};

app.resume = function() {
	if(state === 'paused') {
		draw();
		setState('running');
		app.trigger('app:resume');
	}
};

app.uploadImage = function(doneFunc, endFunc) {
	var imgdata = app.toDataURL('image/jpeg', 1),
		params = 'imgdata=' + imgdata.replace('data:image/jpeg;base64,', '') +
				 '&__csrftoken=' + encodeURIComponent(window.__csrftoken),
		xhr = new XMLHttpRequest();
	xhr.open('POST', 'gallery/upload', true);
	xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
	xhr.setRequestHeader("Content-length", params.length);
	xhr.addEventListener("progress", function(e) {
		if(e.lengthComputable) {
			var percentComplete = (e.loaded / e.total) * 100;
			console.log(percentComplete + '% uploaded');
		}
	});
	xhr.addEventListener("load", function(){
		if(this.status === 200) {
			doneFunc && doneFunc(this);
		}
		else {
			window.alert("An error occurred while saving your drawing to the cloud.\n Please try again later.");
		}
		endFunc && endFunc();
	});	
	xhr.addEventListener("error", function(){
		window.alert("An error occurred while saving your drawing to the cloud.\n Please try again later.");
		endFunc && endFunc();
	});
	xhr.send(params);
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