;(function (app) { 'use strict';

function RandomButton(el){
	el.addEventListener('click', function(){
		app.settings.randomize();
		app.settings.update();
	});
}

[].forEach.call(document.querySelectorAll('[data-app-comp~=random]'), function(el){
	RandomButton(el);
});

app.comps = app.comps || {};
app.comps.Randomize = RandomButton;

}(window.app || (window.app = {})));