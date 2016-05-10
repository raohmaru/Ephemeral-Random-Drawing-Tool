;(function (app) { 'use strict';

var KEY_P = 80;

function PauseButton(el){
	el.addEventListener('click', function(){
		app.pause(true);
	});
	app
		.on('app:pause', function(){
			el.textContent = 'Resume';
		})
		.on('app:resume', function(){
			el.textContent = 'Pause';
		});
}

app.on('app:keyup', function(e){	
	if(e.keyCode === KEY_P) {
		app.pause(true);
	}
});

[].forEach.call(document.querySelectorAll('[data-app-comp~=pause]'), function(el){
	PauseButton(el);
});

}(window.app || (window.app = {})));