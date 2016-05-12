;(function (app) { 'use strict';

var COLORSET = [
		// None
		['rgb(255,255,255)'],
		// Marine
		['rgb(0,0,255)', 'rgb(0,0,128)', 'rgb(0,50,200)', '#5463e7'],
		// Gold
		['#f4da46', '#e9cb52', '#fbe384', '#ffe391', '#fcef94', '#fff200'],
		// Ruby
		['rgba(255,0,0,.75)', 'rgba(243,33,33,1,.75)', 'rgba(248,120,120,.75)', 'rgba(250,156,156,.75)', 'rgba(222,107,107,.75)'],
		// Watercolor
		['rgba(176,187,223,.5)', 'rgba(30,210,179,.5)', 'rgba(166,227,234,.5)'],
		// Grass
		['#98ff75', '#a4f898', '#97f0b6', '#6ae680', '#8dde72', '#32e251'],
		// Earth
		['#d6be9e', '#c4a273', '#b68a50', '#d0cb84', '#d9aa7b', '#c6a58e', '#dbc7b9'],
		// Rainbow
		{seq:['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000']},
		// Unicorn
		['#ee79fb', '#f4acfd', '#f962ea', '#ec13e7', '#f57ebd', '#ff9bff',
		 'rgba(238,121,251, .5)', 'rgba(244,172,253, .5)', 'rgba(249,98,234, .5)', 'rgba(236,19,231, .5)', 'rgba(245,126,189, .5)', 'rgba(255,155,255, .5)']
	],
	Round = Math.round;

function Canvas(canvas, ctx) {	
	canvas.ctx = ctx;	
	canvas.addEventListener('mousemove', mouseListener);
	canvas.addEventListener('dblclick', mouseListener);
	window.addEventListener('resize', resizeCanvas.bind(canvas), false);
	resizeCanvas.call(canvas);
	
	// Public methods
	canvas.drawShape = function(x, y, shapeFunc) {
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
	};
	
	canvas.center = function() {
		ctx.translate(Round(canvas.intWidth/2), Round(canvas.intHeight/2));
	};

	canvas.redraw = function(x, y) {
		x = x || 0;
		y = y || 0;
		ctx.drawImage(canvas, x, y);
	};
	
	canvas.reset = function() {
		// reset current transformation matrix to the identity matrix
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	};
	
	return canvas;
}


function mouseListener(e) {
	var canvas = this;
	if(e.type === 'mousemove') {
		if(!app.options.keyboard) {
			app.cursor.x = e.clientX - canvas.left;
			app.cursor.y = e.clientY - canvas.top;	
		}		
	}
	else if(e.type === 'dblclick') {
		app.pause(true);
	}
}

function resizeCanvas() {
	var canvas = this,
		rect = canvas.getBoundingClientRect();
	canvas.top    = rect.top    | 0;
	canvas.right  = rect.right  | 0;
	canvas.bottom = rect.bottom | 0;
	canvas.left   = rect.left   | 0;
	
	canvas.intWidth  = canvas.width  | 0;
	canvas.intHeight = canvas.height | 0;
}

function getColor(col) {
	var colorset = COLORSET[col],
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

app.comps = app.comps || {};
app.comps.Canvas = Canvas;

}(window.app || (window.app = {})));