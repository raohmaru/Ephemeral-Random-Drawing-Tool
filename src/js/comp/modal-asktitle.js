;(function (app) { 'use strict';

function AskTitle(el) {
	var form = el.querySelector('form'),
		inputs = [].slice.call(el.querySelectorAll('input[type="text"]')),
		completed;
	form.addEventListener('submit', onSubmit);
	inputs[0].focus();
	
	function onSubmit(e) {
		e.preventDefault();
		if(completed) {
			return false;
		}
		
		var error = false,
			data = {};
		inputs.forEach(function(input){
			if(/^\s*$/.test(input.value) === false) {
				data[input.name] = input.value;
				input.classList.remove('input--error');
			}
			else {
				input.classList.add('input--error');
				error = true;
			}
		});
		if(!error) {
			app.trigger('app:titleset', data);
			completed = true;
		}
		return false;
	}
	
	function dispose() {
		form.removeEventListener('submit', onSubmit);
		inputs.forEach(function(input){
			input.classList.remove('input--error');
		});
		form = null;
		inputs = null;
	}	
	
	return {
		dispose: dispose
	};
}

app.comps = app.comps || {};
app.comps.AskTitle = AskTitle;

}(window.app || (window.app = {})));