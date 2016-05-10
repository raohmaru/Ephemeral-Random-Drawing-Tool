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
	var defaults = app.utils.store.get('erdt-settings') || {};
	this.inputs = this.el.querySelectorAll('select, input[type="range"], input[type="checkbox"]');
	
	[].forEach.call(this.inputs, function(input) {
		if(defaults[input.name] !== undefined) {
			if(input.type === 'checkbox') {
				input.checked = defaults[input.name];
			}
			else {
				input.value = defaults[input.name];				
			}
		}
		if(input.type === 'range') {
			input.addEventListener('input', updateRangeValue, false);
			input.addEventListener('change', setRange, false);
			setRange(input);			
		}
		else if(input.type === 'checkbox') {
			input.addEventListener('change', setBoolOption, false);
			setBoolOption(input);
		}
		else {
			input.addEventListener('change', setOption, false);
			setOption(input);
		}
	});
	
	app.utils.store.set('erdt-settings', app.options);	
	return this;
};

proto.reset = function() {
	this.el.querySelector('form').reset();
	// Creating and triggering events, the old-fashioned way because IE<12
	// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Creating_and_triggering_events
	var event = document.createEvent('Event');
	event.initEvent('change', true, true);
	[].forEach.call(this.inputs, function(input) {
		input.dispatchEvent(event);
	});
	localStorage.removeItem('erdt-settings');
};

function setOption(e) {
	var tgt = e.target || e;
	app.options[tgt.name] = parseInt(tgt.value, 10);
	app.settings.trigger('app:change', tgt.name, app.options[tgt.name]);
	// Save settings if triggered by user
	if(e.target) {
		app.utils.store.set('erdt-settings', app.options);		
	}
}

function setRange(e) {
	var tgt = e.target || e;
	app.options[tgt.name] = parseInt(tgt.value, 10);
	app.settings.trigger('app:change', tgt.name, app.options[tgt.name]);
	updateRangeValue(tgt);
	// Save settings if triggered by user
	if(e.target) {
		app.utils.store.set('erdt-settings', app.options);		
	}
}

function updateRangeValue(e) {
	var tgt = e.target || e;
	document.getElementById(tgt.id+'__value').textContent = parseInt(tgt.value, 10);
}

function setBoolOption(e) {
	var tgt = e.target || e;
	app.options[tgt.name] = tgt.checked;	
	app.settings.trigger('app:change', tgt.name, app.options[tgt.name]);
	// Save settings if triggered by user
	if(e.target) {
		app.utils.store.set('erdt-settings', app.options);		
	}
}

app.Settings = Settings;

}(window.app || (window.app = {})));