;(function (app) { 'use strict';

Array.prototype.forEach.call(document.querySelectorAll('[data-app-btn]'), function(el){
	if(el.dataset.appBtn === 'pause') {
		PauseButton(el);
	}
	else if(el.dataset.appBtn === 'save') {
		SaveButton(el);
	}
});

function PauseButton(el){
	el.addEventListener('click', function(){ app.pause(true); });
	app
		.on('app:pause', function(){
			el.value = 'Resume';
		})
		.on('app:resume', function(){
			el.value = 'Pause';
		});
}

function SaveButton(el){
	el.addEventListener('click', function(){ app.saveAsImage(); });
}

}(window.app || (window.app = {})));