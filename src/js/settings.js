;(function (app) { 'use strict';

function Settings(selector){
	// enforces new
	if (!(this instanceof Settings))
		return new Settings(selector);
	
	// constructor body
	this.el = document.querySelector(selector);
	app.utils.eventDecorator(this);
}
var proto = Settings.prototype;

proto.init = function() {
	[].forEach.call(this.el.querySelectorAll('select'), function(input){		
		input.addEventListener('change', setOption, false);
		setOption(input);
	});
	
	[].forEach.call(this.el.querySelectorAll('input[type="range"]'), function(input){		
		input.addEventListener('input', updateRangeValue, false);
		input.addEventListener('change', setRange, false);
		setRange(input);
	});
	
	[].forEach.call(this.el.querySelectorAll('input[type="checkbox"]'), function(input){		
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

app.Settings = Settings;

}(window.app || (window.app = {})));