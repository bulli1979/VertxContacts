(function() {
	"use strict";

	angular.module('contactWeb').factory( 'Context',
	['$resource'
	,function($resource) {
		var activeContact = null;
		var context = {};
		context.setActiveContact = function(contact){
			activeContact = contact;
		};
		context.getActiveContact = function(){
			return activeContact;
		};
		return context;
	}]);
})();