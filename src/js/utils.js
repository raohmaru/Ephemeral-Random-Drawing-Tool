;(function (app) { 'use strict';

app.utils = app.utils || {};

app.utils.randomInt = function(min, max) {
	if(!max) {
		if(!min) {
			min = 1;
		}
		max = min;
		min = 0;
	}
	return Math.round( Math.random()*(max-min) + min );
};

// http://sampsonblog.com/749/simple-throttle-function
app.utils.throttle = function(callback, limit) {
    var wait = false;
    return function () {
        if (!wait) {
            callback.apply(callback, arguments);
            wait = true;
            setTimeout(function () {
                wait = false;
            }, limit);
        }
    };
};

app.utils.eventDecorator = function(obj) {
	var _events = {};	
	
	obj.on = function(eventName, callback) {
		if(!_events[eventName]) {
			_events[eventName] = [callback];
		}
		else if(!(callback in _events[eventName])){
			_events[eventName].push(callback);
		}
		return this;
	};
	
	obj.trigger = function(eventName) {
		if(_events[eventName]) {
			var funcs = _events[eventName],
				i = funcs.length-1,
				args = [].slice.call(arguments, 1),
				fun;
			for(i; i>-1; --i) {
				fun = funcs[i];
				fun.apply(fun, args);
			}
		}
		return this;
	};
};

app.utils.store = (function() {
	var memory = {};
	
	return function store(name, data) {
		if(data !== undefined) {
			memory[name] = data;
			return data;
		}
		else {
			return memory[name];
		}
	};
})();
	
	
}(window.app || (window.app = {})));