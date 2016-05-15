;(function (app) { 'use strict';

app.cfg = {
	url: 'http://raohmaru.com/lab/js/erdt/gallery/',
	drawingID: '',
	KEY_LEFT : 37,
	KEY_UP   : 38,
	KEY_RIGHT: 39,
	KEY_DOWN : 40,
	KEY_ESC  : 27,
	KEY_P    : 80,
	KEY_S    : 83,
	KEY_CMD_S: 19,  // OS X webkit browsers
	
	COLORSET : [
		// None
		['rgb(255,255,255)'],
		// Marine
		['rgb(0,0,255)', 'rgb(0,0,128)', 'rgb(0,50,200)', '#5463e7'],
		// Gold
		['#f4da46', '#e9cb52', '#fbe384', '#ffe391', '#fcef94', '#fff200'],
		// Ruby
		['rgba(255,0,0,.75)', 'rgba(243,33,33,.75)', 'rgba(248,120,120,.75)', 'rgba(250,156,156,.75)', 'rgba(222,107,107,.75)'],
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
	]
}

}(window.app || (window.app = {})));