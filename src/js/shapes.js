;(function (app) { 'use strict';

var PI = Math.PI,
	PI2 = PI*2,
	LETTERS = [
		'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',
		'0','1','1','2','3','4','5','6','7','8','9','&','?','!', '#', '@', '©'
	];

app.shapes = app.shapes || {};

var shapeNone = function() {},

	shapeSquare = function(x, y, sz) {
		drawRect(x, y, sz);
	},
	
	shapeCircle = function(x, y, sz) {
		app._ctx.beginPath();
		app._ctx.arc(x, y, sz, 0, PI2);		
		if(app.options.fill) {
			app._ctx.fill();
		}
		else {
			app._ctx.stroke();
		}
	},
	
	shapeText = function(x, y, sz) {
		var text = LETTERS[app.utils.randomInt(LETTERS.length-1)];
		x = (x - sz/2)|0;
		y = (y + sz/2)|0;
		app._ctx.font = sz + 'px "Trebuchet MS", Arial, "Helvetica Neue", Helvetica, sans-serif';
		if(app.options.fill)
			app._ctx.fillText(text, x, y);
		else
			app._ctx.strokeText(text, x, y);
	},

	shapeLine = function(x, y, sz) {
		drawRect(x, y, sz, 2);
	},

	shapeLogo = function(x, y, sz) {
		if(!app.utils.store('imgAsset')) {
			app.utils.store('imgAsset', document.getElementById("imgAsset"));
		}
		var image = app.utils.store('imgAsset');
		x = (x - sz/2)|0;
		y = (y - sz/2)|0;
		app._ctx.drawImage(image, x, y, sz, sz);
	};
	
function drawRect(x, y, w, h) {
	h = h || w;
	x = (x - w/2)|0;
	y = (y - h/2)|0;
	// if(app.utils.randomInt())
	if(app.options.fill)
		app._ctx.fillRect(x, y, w, h);
	else
		app._ctx.strokeRect(x, y, w, h);
}

function preDraw(x, y) {
	if(app.options.rotation) {
		app._ctx.save();
		app._ctx.translate(x, y);
		app._ctx.rotate(app.options.rotation * PI / 180);
		return [0, 0];
	}
}

function postDraw(param) {
	if(app.options.rotation) {
		app._ctx.restore();
	}
}

app.shapes.getById = function(id) {
	var drawFunc = shapeNone;
	if     (id === 1) drawFunc = shapeSquare;
	else if(id === 2) drawFunc = shapeCircle;
	else if(id === 3) drawFunc = shapeText;
	else if(id === 4) drawFunc = shapeLine;
	else if(id === 5) drawFunc = shapeLogo;
	
	return function(x, y, sz) {
		var res = preDraw(x, y);
		if(res) {
			x = res[0];
			y = res[1];
		}
		drawFunc(x, y, sz);
		postDraw();
	};
};

}(window.app || (window.app = {})));