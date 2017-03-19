
(function(){
	
	"use strict";
	
	
	angular.module('contactWeb')
		.config([ '$stateProvider', '$urlRouterProvider' , function($stateProvider, $urlRouterProvider) {
			$stateProvider
			    .state('edit', {
			      url: "/edit",
			      templateUrl: "ui/edit/edit.html",
			    });
			}]);
	
		  
})();
