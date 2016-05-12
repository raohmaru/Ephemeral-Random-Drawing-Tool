;(function (app) { 'use strict';

function AskTitle(el) {
	var form = el.querySelector('form'),
		inputText = el.querySelector('input[type="text"]');
	form.addEventListener('submit', onSubmit);
	inputText.focus();
	
	function onSubmit(e) {
		e.preventDefault();
		if(/^\s*$/.test(inputText.value) === false) {
			inputText.classList.remove('input--error');
			app.trigger('app:titleset', inputText.value);
		}
		else {
			inputText.classList.add('input--error');
		}
		return false;
	}
	
	function dispose() {
		form.removeEventListener('submit', onSubmit);
		inputText.classList.remove('input--error');
		form = null;
		inputText = null;
	}	
	
	return {
		dispose: dispose
	}
};

app.comps = app.comps || {};
app.comps.AskTitle = AskTitle;

}(window.app || (window.app = {})));