;(function (app) { 'use strict';

var	KEY_ESC = 27;
	
function Modal(el){	
	var api = {
		close: close
	};
	app.utils.createCallbacksFor(api, 'onClose');
	
	el.classList.add('modal--open');
	el.querySelector('.modal__overlay').addEventListener('click', close);	
	el.querySelector('[data-app-modal-close]').addEventListener('click', close);
	window.addEventListener('keyup', keyHandler, false);
	// Init components
	var comps = [].map.call(el.querySelectorAll('[data-app-comp]'), function(el){
		return app.initComp(el, api);
	});
	
	function keyHandler(e){
		if(e.keyCode === KEY_ESC) {
			close();
		}
	}
	
	function close() {
		el.classList.remove('modal--open');
		el.querySelector('.modal__overlay').removeEventListener('click', close);
		el.querySelector('[data-app-modal-close]').removeEventListener('click', close);	
		window.removeEventListener('keyup', keyHandler);
		api.onClose();
		comps.forEach(function(comp) {
			comp && comp.dispose();
		});
		api = null;
		comps = null;
	}
	
	return api;
}

app.comps = app.comps || {};
app.comps.Modal = Modal;

}(window.app || (window.app = {})));