;(function (app) { 'use strict';

Array.prototype.forEach.call(document.querySelectorAll('[data-app-action]'), function(el){
	if(el.dataset.appAction === 'pause') {
		PauseButton(el);
	}
	else if(el.dataset.appAction === 'save') {
		SaveButton(el);
	}
});

function PauseButton(el){
	el.addEventListener('click', function(){ app.pause(true); });
	app
		.on(app.events.PAUSE, function(){
			el.value = 'Resume';
		})
		.on(app.events.RESUME, function(){
			el.value = 'Pause';
		});
}

function SaveButton(el){
	el.addEventListener('click', function(){ app.saveAsImage(); });
}

}(window.app || (window.app = {})));