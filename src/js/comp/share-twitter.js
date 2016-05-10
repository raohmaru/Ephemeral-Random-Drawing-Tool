;(function (app) { 'use strict';

function ShareButton(el){
	var winOptions = 'scrollbars=yes,resizable=yes,toolbar=no,location=yes',
		width      = 550,
		height     = 420,
		url        = 'https://twitter.com/intent/tweet?' +
					 'hashtags=EphemeralRandomDrawing' +
					 '&text=Check my Ephemeral Drawing!' +
					 '&url=' + encodeURIComponent('http://raohmaru.com/lab/js/erdt/');
					 
	el.addEventListener('click', function(e){
		e.preventDefault();
		if(el.classList.contains('is-disabled')) {
			return;
		}		
		el.classList.add('is-disabled');
		app.uploadImage(
			// Done
			function(xhr){
				var left = Math.round((screen.width / 2) - (width / 2)),
					top = (screen.height > height) ? Math.round((screen.height / 2) - (height / 2)) : 0; 
				window.open(url+xhr.responseText, 'intent', winOptions + ',width=' + width +
							',height=' + height + ',left=' + left + ',top=' + top);
			},
			// Always
			function(){
				el.classList.remove('is-disabled');
			}
		);
	});
}

[].forEach.call(document.querySelectorAll('[data-app-comp~=share-twitter]'), function(el){
	ShareButton(el);
});

}(window.app || (window.app = {})));