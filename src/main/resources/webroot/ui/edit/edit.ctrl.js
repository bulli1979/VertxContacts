(function() {

	"use strict";

	angular.module('contactWeb').controller('EditController',
			[ '$scope', 'ContactEndpoint','Context',"$state", function($scope, ContactEndpoint,Context,$state) {
				var vm = this;
				$scope.contact = Context.getActiveContact();
				if($scope.contact == null){
					$scope.contact = {};
					$scope.contact.id=-1;
					$scope.contact.firstname = "";
					$scope.contact.name="";
					$scope.contact.street="";
					$scope.contact.zip="";
					$scope.contact.city="";
				}
				
				$scope.save = function() {
					Context.setActiveContact($scope.contact);
					ContactEndpoint.save($scope.contact);
					return false;
				}
				
				$scope.back = function(){
					Context.setActiveContact(null);
					$state.go("home");
					return false;
				}
				
			}]);
})();