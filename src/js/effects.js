;(function (app) { 'use strict';

app.effects = app.effects || {};

var effectNone = function() {},

	effectMoveHorizontal = function() {
		redraw(1*app.options.dir*app.options.speed, 0);
	},

	effectMoveVertical = function() {
		redraw(0, 1*app.options.dir*app.options.speed);
	},
	
	effectRotate = function() {
		centerCanvas();
		app._ctx.rotate(.01*app.options.dir*app.options.speed);
		redraw(-app._canvas.width/2, -app._canvas.height/2);
	},
	
	effectScale = function() {
		var scale = .01 * app.options.speed;
		centerCanvas();
		if(app.options.reverse) {
			scale = 1 + scale;
			app._ctx.scale(scale, scale);
		} else {
			scale = 1 - scale;
			app._ctx.scale(scale, scale);
		}
		redraw(-app._canvas.width/2, -app._canvas.height/2);
	},
	
	effectSkew = function() {
		app._ctx.transform(
			// Horizontal scaling.
			1,
			// Horizontal skewing.
			0.02*app.options.dir*app.options.speed,
			// Vertical skewing.
			0.01*app.options.dir*app.options.speed,
			// Vertical scaling.
			1,
			// Horizontal moving.
			0,
			// Vertical moving. 
			0
		);
		redraw();
	};
	
function centerCanvas() {
	app._ctx.translate(app._canvas.width/2, app._canvas.height/2);
}

function redraw(x, y) {
	x = x || 0;
	y = y || 0;
	app._ctx.drawImage(app._canvas, x, y);
}

app.effects.getById = function(id) {
	if(id === 1) return effectMoveHorizontal;
	if(id === 2) return effectMoveVertical;
	if(id === 3) return effectRotate;
	if(id === 4) return effectScale;
	if(id === 5) return effectSkew;
	return effectNone;
};

}(window.app || (window.app = {})));