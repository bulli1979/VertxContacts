
(function(){
	
	"use strict";
	
	var contactWeb = angular.module('contactWeb', ['ngResource', 'ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {
			  $urlRouterProvider.otherwise("/home");
		});
})();



