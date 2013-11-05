(function () {
	'use strict';

	angular.module('webApp.controllers')

	.controller('HomeCtrl', ['$scope', function ($scope) {

		$scope.welcomeMessage = 'Hello Angular!';

	}]);

})();