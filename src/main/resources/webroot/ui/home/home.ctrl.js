(function() {

	"use strict";

	angular.module('contactWeb').controller('HomeController',
			[ '$scope','$state',"Context", 'ContactEndpoint', function($scope, $state, Context, ContactEndpoint) {
				var vm = this;
				vm.contacts = ContactEndpoint.getAll();
				$scope.contactModel = {
						model : null,
						availableOptions : vm.contacts
				};
				
				$scope.newContact = function(){
					$state.go("edit");
				};
				
				$scope.open = function(contact){
					Context.setActiveContact(contact);
					console.log("test");
					$state.go("edit");
					return false;
				}
			}]);
})();