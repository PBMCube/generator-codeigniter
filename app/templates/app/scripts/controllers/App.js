(function() {
    'use strict';

    angular.module('webApp.controllers')

    .controller('AppCtrl', ['$scope', '$stateParams', '$state', '$rootScope', '$location', '$window', '$timeout',
        function($scope, $stateParams, $state, $rootScope, $location, $window, $timeout) {

            angular.extend($rootScope, $window.app);

            $scope.$on('$stateChangeSuccess', function(e, toState, toParams, fromState, fromParams) {
                $state.previous = fromState;

                $rootScope.currentURL = $location.absUrl();

                $rootScope.urlSegments = $location.path().slice(1, -1).split('/');

                $rootScope.stateName = toState.name;

                // ga('send', 'pageview', {'page': $location.path()});
            });

            $scope.resize = function() {
                $rootScope.emScale = Number(parseFloat(angular.element('body').css('font-size')).toString());
            };

            $scope.resize();

            angular.element($window).on('resize', $scope.resize);

        }
    ]);

})();
