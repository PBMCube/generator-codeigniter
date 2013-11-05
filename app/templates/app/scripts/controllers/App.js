(function () {
    'use strict';

    angular.module('webApp.controllers')

    .controller('AppCtrl', ['$scope', '$stateParams', '$state', '$rootScope', '$location', '$window', '$timeout',
        function ($scope, $stateParams, $state, $rootScope, $location, $window, $timeout) {

            console.log('AppCtrl', $scope, $stateParams, $state);

            $rootScope.$on('$stateChangeSuccess', function (e, toState, toParams, fromState, fromParams) {
                $('html').attr('data-state', toState.name);
            });

            if (!$.support.transition) {
                $.fn.transition = $.fn.animate;
            }

            $rootScope.emScale = parseInt($('body').css('font-size'), 10);

            $(window).on('resize', function (e) {
                $rootScope.emScale = parseInt($('body').css('font-size'), 10);
            });

            $rootScope.$on('$viewContentLoaded', function () {
                // ga('send', 'pageview', {'page': $location.path()});
            });

        }
    ]);

})();