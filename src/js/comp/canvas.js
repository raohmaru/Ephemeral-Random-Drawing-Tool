;(function (app) { 'use strict';

var COLORSET = [
		['rgb(255,255,255)'],  // None
		['rgb(0,0,255)', 'rgb(0,0,128)', 'rgb(0,50,200)', '#5463e7'],  // Marine
		['#f4da46', '#e9cb52', '#fbe384', '#ffe391', '#fcef94', '#fff200'],  // Gold
		['rgba(243,33,33,1,.75)', 'rgba(248,120,120,.75)', 'rgba(250,156,156,.75)', 'rgba(222,107,107,.75)'],  // Ruby
		['rgba(176,187,223,.5)', 'rgba(30,210,179,.5)', 'rgba(166,227,234,.5)'],  // Watercolor
		['#98ff75', '#a4f898', '#97f0b6', '#6ae680', '#8dde72', '#32e251'],  // Grass
		{seq:['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000']}  // Rainbow
	],
	Round = Math.round;

function Canvas(canvas, ctx) {	
	canvas.ctx = ctx;	
	canvas.addEventListener('mousemove', mouseListener);
	canvas.addEventListener('dblclick', mouseListener);
	window.addEventListener('resize', resizeCanvas, false);
	resizeCanvas();		

	function mouseListener(e) {
		if(e.type === 'mousemove') {
			if(app.options.mouse) {
				app.cursor.x = e.clientX - canvas.left;
				app.cursor.y = e.clientY - canvas.top;	
			}		
		}
		else if(e.type === 'dblclick') {
			app.pause(true);
		}
	}

	function resizeCanvas() {
		var rect = canvas.getBoundingClientRect();
		canvas.top    = rect.top | 0;
		canvas.right  = rect.right | 0;
		canvas.bottom = rect.bottom | 0;
		canvas.left   = rect.left | 0;
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
	
	return canvas;
}

app.Canvas = Canvas;

}(window.app || (window.app = {})));