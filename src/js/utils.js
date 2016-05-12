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
	var events = {},
		disabled = [];
	
	obj.on = function(eventName, callback) {
		if(!events[eventName]) {
			events[eventName] = [callback];
		}
		else if(!(callback in events[eventName])){
			events[eventName].push(callback);
		}
		return this;
	};
	
	obj.off = function(eventName, callback) {
		if(events[eventName]) {
			var idx = events[eventName].indexOf(callback);
			if(idx > -1) {
				events[eventName].splice(idx, 1);
			}
		}
		return this;
	};
	
	obj.trigger = function(eventName) {
		if(disabled.indexOf(eventName) > -1) {
			return this;
		}
		if(events[eventName]) {
			var funcs = events[eventName],
				len = funcs.length,
				args = [].slice.call(arguments, 1),
				i, fun;
			for(i=0; i<len; i++) {
				fun = funcs[i];
				fun.apply(fun, args);
			}
		}
		return this;
	};
	
	obj.mute = function(eventName) {
		disabled.push(eventName);
		return this;
	};
	
	obj.unmute = function(eventName) {
		disabled = disabled.filter(function(item){
			return item !== eventName;
		})
		return this;
	};
};

app.utils.memoize = (function() {
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

app.utils.store = {
	get: function(name) {
		return JSON.parse(window.localStorage.getItem(name));
	},
	set: function(name, data) {
		window.localStorage.setItem(name, JSON.stringify(data));
	}
};

app.utils.popup = function(url, name) {
	var winOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
		width      = 550,
		height     = 420,
		left = Math.round((screen.width / 2) - (width / 2)),
		top = (screen.height > height) ? Math.round((screen.height / 2) - (height / 2)) : 0; 
	window.open(url, name, winOptions + ',width=' + width + ',height=' + height + ',left=' + left + ',top=' + top);
};

app.utils.extends = function(child, parent) {	
	child.prototype = Object.create(parent.prototype);
	child.prototype.constructor = child;
	child.__super__ = parent.prototype;
	return child;
};

app.utils.createCallbacksFor = function(obj, name) {
	if(Array.isArray(name)) {
		name.map(function(item){
			app.utils.createCallbacksFor(obj, item);
		});
		return obj;
	}
	
	obj[name] = (function(key) {
		return function(callback){
			var fns = obj[key]._callbacks = obj[key]._callbacks || [];
			if(callback) {
				fns.push(callback);
			}
			else {
				var args = [].slice.call(arguments, 1);
				fns.forEach(function(fn){
					fn.apply(obj, args);
				});
				fns.length = 0;
			}
			return this;
		}
	})(name);
	return obj;
}
	
	
}(window.app || (window.app = {})));