(function() {
    'use strict';

    angular.module('webApp.controllers')

    .controller('HomeCtrl', ['$rootScope', '$scope',
        function($rootScope, $scope) {

            $rootScope.pageTitle = 'Home';
            $rootScope.metaDescription = 'This site will change your life, probably.';
            $rootScope.metaKeywords = 'Rarely, used, but, whatever';

            $scope.welcomeMessage = 'Hello Angular!';

        }
    ]);

})();
