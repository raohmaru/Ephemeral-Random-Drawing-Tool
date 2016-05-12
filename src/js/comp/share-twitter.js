;(function (app) { 'use strict';

var ShareTwitter = (function() {
	app.utils.extends(ShareTwitter, app.comps.Share);
	
	function ShareTwitter(el) {
		ShareTwitter.__super__.constructor.call(this, "twitter", el);
		this.url = 'https://twitter.com/intent/tweet?' +
				   'hashtags=EphemeralRandomDrawing' +
				   '&text=Check my Ephemeral Drawing!' +
				   '&url=';
	};
	
	return ShareTwitter;
})();

[].forEach.call(document.querySelectorAll('[data-app-comp~=share-twitter]'), function(el){
	new ShareTwitter(el);
});

}(window.app || (window.app = {})));