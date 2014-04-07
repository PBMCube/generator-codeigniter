(function() {
    'use strict';

    angular.module('webApp.filters')

    .filter('exampleFilter', function() {
        return function(input) {
            return input.split('').reverse().join('');
        };
    });
})();
