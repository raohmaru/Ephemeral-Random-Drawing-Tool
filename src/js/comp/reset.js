;(function (app) { 'use strict';

function ResetButton(el){
	el.addEventListener('click', function(){
		app.settings.reset();
		app.canvas.clear();
	});
}

[].forEach.call(document.querySelectorAll('[data-app-comp~=reset]'), function(el){
	ResetButton(el);
});

}(window.app || (window.app = {})));