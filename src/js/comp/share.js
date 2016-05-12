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
		this.share();
	}.bind(this));
};

proto.share = function(){
	if(this.el.classList.contains('is-disabled')) {
		return;
	}
	var me = this;
	this.el.classList.add('is-disabled');
	var modal = app.openModal('ask-title')
		.onClose(function(){
			me.el.classList.remove('is-disabled');
			app.off('app:titleset', onTitleSet);
		});
	app.on('app:titleset', onTitleSet);
	
	function onTitleSet(data){
		modal.close();
		app.uploadImage(data.title, data.author)
			.done(function(xhr){
				var url = me.url + encodeURIComponent('http://raohmaru.com/lab/js/erdt/gallery/') + xhr.responseText;
				app.utils.popup(url, 'twitter');
			})			
			.end(function(){
				me.el.classList.remove('is-disabled');
			});
	}
};

app.comps = app.comps || {};
app.comps.Share = Share;

}(window.app || (window.app = {})));