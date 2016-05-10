;(function (app) { 'use strict';

function SaveButton(el){
	el.addEventListener('click', function(){
		window.open(app.toDataURL());
	});
}

[].forEach.call(document.querySelectorAll('[data-app-comp~=save]'), function(el){
	SaveButton(el);
});

}(window.app || (window.app = {})));