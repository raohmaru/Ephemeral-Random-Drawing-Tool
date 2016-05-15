;(function (app) { 'use strict';

var Round = Math.round;

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
	
	canvas.resetTransform = function() {
		// reset current transformation matrix to the identity matrix
		ctx.setTransform(1, 0, 0, 1, 0, 0);
	};
	
	canvas.clear = function() {
		ctx.fillStyle = 'rgb(0,0,0)';
		ctx.fillRect(0, 0, canvas.intWidth, canvas.intHeight);
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
	var colorset = app.cfg.COLORSET[col],
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