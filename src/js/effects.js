;(function (app) { 'use strict';

app.effects = app.effects || {};

var effectNone = function() {},

	effectMoveHorizontal = function() {
		app.canvas.redraw(1*app.options.dir*app.options.speed, 0);
	},

	effectMoveVertical = function() {
		app.canvas.redraw(0, 1*app.options.dir*app.options.speed);
	},

	effectMoveDiagonal = function() {
		var n = 1*app.options.dir*app.options.speed;
		app.canvas.redraw(-n, n);
	},
	
	effectRotate = function() {
		app.canvas.center();
		app.canvas.ctx.rotate(.01*app.options.dir*app.options.speed);
		app.canvas.redraw(-app.canvas.intWidth/2, -app.canvas.intHeight/2);
		app.canvas.resetTransform();
	},
	
	effectScale = function() {
		var scale = .01 * app.options.speed;
		app.canvas.center();
		if(app.options.reverse) {
			scale = 1 + scale;
			app.canvas.ctx.scale(scale, scale);
		} else {
			scale = 1 - scale;
			app.canvas.ctx.scale(scale, scale);
		}
		app.canvas.redraw(-app.canvas.intWidth/2, -app.canvas.intHeight/2);
		app.canvas.resetTransform();
	},
	
	effectSkew = function() {
		app.canvas.ctx.transform(
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
		app.canvas.redraw();
		app.canvas.resetTransform();
	};

app.effects.getById = function(id) {
	if(id === 1) return effectMoveHorizontal;
	if(id === 2) return effectMoveVertical;
	if(id === 3) return effectMoveDiagonal;
	if(id === 4) return effectRotate;
	if(id === 5) return effectScale;
	if(id === 6) return effectSkew;
	return effectNone;
};

}(window.app || (window.app = {})));