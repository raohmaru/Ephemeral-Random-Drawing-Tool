;(function (app) { 'use strict';

var ShareFacebook = (function() {
	app.utils.extends(ShareFacebook, app.comps.Share);
	
	function ShareFacebook(el) {
		ShareFacebook.__super__.constructor.call(this, "facebook", el);
		// http://stackoverflow.com/questions/20956229/has-facebook-sharer-php-changed-to-no-longer-accept-detailed-parameters
		this.url = 'https://www.facebook.com/sharer.php?&u=';
	};
	
	return ShareFacebook;
})();

[].forEach.call(document.querySelectorAll('[data-app-comp~=share-facebook]'), function(el){
	new ShareFacebook(el);
});

}(window.app || (window.app = {})));