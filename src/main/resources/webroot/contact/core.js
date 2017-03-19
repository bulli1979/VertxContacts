
(function(){
	
	"use strict";
	
	var contactWeb = angular.module('contactWeb', ['ngResource', 'ui.router'])
		.config(function($stateProvider, $urlRouterProvider) {
			  $urlRouterProvider.otherwise("/home");
		});
})();




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
(function() {
	"use strict";
	angular.module('contactWeb').factory(
		'ContactEndpoint',
		[
			'$resource','$http','Context',
			function($resource,$http,Context) {
				var ContactEndpoint = {};
				var options = {
					'query' : {
						isArray : false
					}
				};
				var allPath = $resource('/getContacts/', {
				});
				ContactEndpoint.getAll = function() {
					return allPath.query({});
				};

				ContactEndpoint.save = function(contact) {
					 $http.post('/editContact/', contact, null)
			            .success(function (data, status, headers, config) {
			            Context.getActiveContact.id = data.id;
			         })
			            .error(function (data, status, header, config) {
			            	console.log(data);
			         });
				};
				
				return ContactEndpoint;
			}
		]
	);
})();

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

