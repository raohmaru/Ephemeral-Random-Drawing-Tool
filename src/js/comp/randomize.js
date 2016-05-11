;(function (app) { 'use strict';

function RandomButton(el){
	el.addEventListener('click', function(){
		app.settings.inputs.forEach(function(input) {
			if(input.type === 'range') {
				input.value = app.utils.randomInt(input.min, input.max);
			}
			else if(input.type === 'checkbox') {
				if(input.name !== 'mouse') {
					input.checked = !!app.utils.randomInt(1);
				}
			}
			else {
				input.value = input.options[app.utils.randomInt(input.options.length-1)].value;
			}
		});		
		app.settings.update();
	});
}

[].forEach.call(document.querySelectorAll('[data-app-comp~=random]'), function(el){
	RandomButton(el);
});

}(window.app || (window.app = {})));