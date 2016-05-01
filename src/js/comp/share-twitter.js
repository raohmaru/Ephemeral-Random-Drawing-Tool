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
		
		var imgdata = app.toDataURL(),
			params = 'imgdata=' + imgdata.replace('data:image/png;base64,', ''),
			xhr = new XMLHttpRequest();
		xhr.open('POST', 'gallery/upload', true);
		xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhr.setRequestHeader("Content-length", params.length);
		xhr.addEventListener("progress", function(e) {
			if(e.lengthComputable) {
				var percentComplete = (e.loaded / e.total) * 100;
				console.log(percentComplete + '% uploaded');
			}
		});
		xhr.addEventListener("load", function(){
			if(this.status === 200) {
				var left = Math.round((screen.width / 2) - (width / 2)),
					top = (screen.height > height) ? Math.round((screen.height / 2) - (height / 2)) : 0; 
				window.open(url+this.responseText, 'intent', winOptions + ',width=' + width +
							',height=' + height + ',left=' + left + ',top=' + top);
			}
			else {
				window.alert("An error occurred while saving your drawing to the cloud.");
			}
			el.classList.remove('is-disabled');
		});	
		xhr.addEventListener("error", function(){
			window.alert("An error occurred while saving your drawing to the cloud.");
			el.classList.remove('is-disabled');
		});
		el.classList.add('is-disabled');
		xhr.send(params);
	});
}

Array.prototype.forEach.call(document.querySelectorAll('[data-app-comp~=share-twitter]'), function(el){
	ShareButton(el);
});

}(window.app || (window.app = {})));