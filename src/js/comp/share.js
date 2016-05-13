;(function (app) { 'use strict';

// Base class
var Share = function(name, el) {
	this.winname = name;
	this.el = el;
	this.initialize();
};
var proto = Share.prototype;

proto.initialize = function(){
	this.el.addEventListener('click', function(e){
		e.preventDefault();
		if(this.url) {
			this.share();			
		}
		else {
			this.openUploadModal();
		}
	}.bind(this));
};

proto.share = function(){
	var url = this.url + encodeURIComponent(app.cfg.url) + app.cfg.drawingID;
	app.utils.popup(url, this.winname);
};

proto.openUploadModal = function(){
	app.openModal('upload');
};

app.comps = app.comps || {};
app.comps.Share = Share;

[].forEach.call(document.querySelectorAll('[data-app-comp~=share]'), function(el){
	new Share(null, el);
});

}(window.app || (window.app = {})));