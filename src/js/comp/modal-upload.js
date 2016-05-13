;(function (app) { 'use strict';

function UploadModal(el, modal) {
	var steps = [].slice.apply(el.querySelectorAll('[data-app-modal-step]')),
		form = steps[0],
		inputs = [].slice.call(steps[0].querySelectorAll('input[type="text"]')),
		step;
	nextStep(0);
	form.addEventListener('submit', onSubmit);
	inputs[0].focus();
	
	function nextStep(n) {
		step = n !== undefined ? n : step+1;
		if(step >= steps.length) {
			return;
		}
		steps.forEach(function(item) {
			item.classList.remove('modal__currentStep');
		});
		steps[step].classList.add('modal__currentStep');
	}	
	
	function onSubmit(e) {
		e.preventDefault();
		if(step !== 0) {
			return false;
		}		
		var error = false,
			data = {};
		inputs.forEach(function(input){
			if(/^\s*$/.test(input.value) === false) {
				data[input.name] = input.value;
				input.classList.remove('input--error');
			}
			else {
				input.classList.add('input--error');
				error = true;
			}
		});
		if(!error) {
			nextStep();
			upload(data);
		}
		return false;
	}
	
	function upload(data) {
		app.uploadImage(data.title, data.author)
			.done(function(xhr){
				nextStep();
				share(xhr.responseText);
			})
			.error(function(xhr){
				modal.close();
			});
	}
	
	function share(drawingID) {
		var link = steps[step].querySelector('[data-app-modal-url]'),
			url = app.cfg.url + drawingID;
		link.href = url;
		link.textContent = url;
		app.cfg.drawingID = drawingID;
		[].forEach.call(steps[step].querySelectorAll('[data-app-comp^=share-]'), function(item){
			item.addEventListener('click', modal.close);
		});
	}	
	
	function dispose() {
		form.removeEventListener('submit', onSubmit);
		inputs.forEach(function(input){
			input.classList.remove('input--error');
		});
		[].forEach.call(el.querySelectorAll('[data-app-comp^=share-]'), function(item){
			item.removeEventListener('click', modal.close);
		});
		form = null;
		inputs = null;
		steps = null;
	}	
	
	return {
		dispose: dispose
	};
}

app.comps = app.comps || {};
app.comps.UploadModal = UploadModal;

}(window.app || (window.app = {})));