;(function (app) { 'use strict';

var	KEY_S     = 83,
	KEY_CMD_S = 19;  // OS X webkit browsers
	
function SaveButton(el){
	el.addEventListener('click', saveCanvas);
}

app.on('app:keydown', function(e){	
	// Capture Ctrl + S		
	if(e.keyCode === KEY_S && (e.ctrlKey || e.metaKey) || e.keyCode === KEY_CMD_S) {
		e.preventDefault();
		saveCanvas();
		return false;
	}
});

function saveCanvas(e) {
	var name = 'my-ephemeral-random-drawing.png',
		link;
	// window.open(app.toDataURL());
	if(app.canvas.msToBlob) {
		window.navigator.msSaveBlob(app.canvas.msToBlob(), name);			
	}
	else {
		if(!e) {
			link = document.querySelector('[data-app-comp~=save]');
			link.click();
			return;
		}
		e.target.href = app.toDataURL();
		e.target.download = name;
	}
}

[].forEach.call(document.querySelectorAll('[data-app-comp~=save]'), function(el){
	SaveButton(el);
});

}(window.app || (window.app = {})));