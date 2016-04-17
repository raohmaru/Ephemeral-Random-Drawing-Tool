;(function (app) { 'use strict';

function PauseButton(el){
	el.addEventListener('click', function(){
		app.pause(true);
	});
	app
		.on('app:pause', function(){
			el.value = 'Resume';
		})
		.on('app:resume', function(){
			el.value = 'Pause';
		});
}

Array.prototype.forEach.call(document.querySelectorAll('[data-app-comp~=pause]'), function(el){
	PauseButton(el);
});

}(window.app || (window.app = {})));