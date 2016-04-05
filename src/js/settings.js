;(function (app) { 'use strict';

var options = {
		shape     : 1,
		effect    : 1,
		reverse   : false,
		dir       : 1,
		size      : 10,
		variation : 10,
		dispersion: 15,
		spacing   : 2,
		fill      : true,
		speed     : 1,
		color     : 0,
		mouse     : true,
		rotation  : 0,
		ghost     : 8
	};
	
app.settings = app.settings || {};
app.utils.eventDecorator(app.settings);

app.settings.init = function() {
	app.options = options;
	
	Array.prototype.forEach.call(document.querySelectorAll('.settings select'), function(input){		
		input.addEventListener('change', setOption, false);
		setOption(input);
	});
	
	Array.prototype.forEach.call(document.querySelectorAll('.settings input[type="range"]'), function(input){		
		input.addEventListener('input', updateRangeValue, false);
		input.addEventListener('change', setRange, false);
		setRange(input);
	});
	
	Array.prototype.forEach.call(document.querySelectorAll('.settings input[type="checkbox"]'), function(input){		
		input.addEventListener('change', setBoolOption, false);
		setBoolOption(input);
	});
	
	return this;
};

function setOption(e) {
	var tgt = e.target || e;
	app.options[tgt.name] = parseInt(tgt.value, 10);
	app.settings.trigger('app:change', tgt.name, app.options[tgt.name]);
}

function setRange(e) {
	var tgt = e.target || e;
	app.options[tgt.name] = parseInt(tgt.value, 10);
	app.settings.trigger('app:change', tgt.name, app.options[tgt.name]);
	updateRangeValue(tgt);
}

function updateRangeValue(e) {
	var tgt = e.target || e;
	document.getElementById(tgt.id+'__value').textContent = parseInt(tgt.value, 10);
}

function setBoolOption(e) {
	var tgt = e.target || e;
	app.options[tgt.name] = tgt.checked;	
	app.settings.trigger('app:change', tgt.name, app.options[tgt.name]);
}

}(window.app || (window.app = {})));