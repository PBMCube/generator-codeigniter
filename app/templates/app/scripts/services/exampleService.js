(function() {
    'use strict';

    angular.module('webApp.services')

    .factory('exampleService', ['$http',
        function exampleService($http) {

            var privateVar = 'Hello World';

            var service = {};

            service.get = function() {
                return privateVar;
            };

            return service;
        }
    ]);
})();
