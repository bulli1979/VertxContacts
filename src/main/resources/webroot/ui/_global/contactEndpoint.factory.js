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
