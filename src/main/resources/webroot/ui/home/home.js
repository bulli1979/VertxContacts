
(function(){
	
	"use strict";
	
	
	angular.module('contactWeb')
		.config([ '$stateProvider', '$urlRouterProvider' , function($stateProvider, $urlRouterProvider) {
			$stateProvider
			    .state('home', {
			      url: "/home",
			      templateUrl: "ui/home/home.html",
			    });
			}]);
	
		  
})();
