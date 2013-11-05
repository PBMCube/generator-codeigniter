(function () {

    'use strict';

    var webApp = angular.module('webApp', [
        'ui.router',
        'ngSanitize',
        'webApp.controllers',
        'webApp.services',
        'webApp.filters'
    ]);

    webApp.config(
        ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$provide',
            function ($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $provide) {

                $locationProvider.html5Mode(true);

                // Overrides

                // Kill default ng-src
                $provide.decorator('ngSrcDirective', ['$delegate', '$sniffer', function ($delegate, $sniffer) {
                    var directive = $delegate[0].compile = function (element, attrs) {};
                    return $delegate;
                }]);

                // Send data as form vars by default
                // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

                // Routing

                $urlRouterProvider.otherwise('/');

                // Deal with missing trailing slash
                $urlRouterProvider.rule(function ($injector, $location) {
                    var path = $location.path(), search = $location.search();
                    if (path[path.length - 1] !== '/') {
                        if ($.isEmptyObject(search)) {
                            return path + '/';
                        } else {
                            var params = [];
                            angular.forEach(search, function (v, k) {
                                params.push(k + '=' + v);
                            });
                            return path + '/?' + params.join('&');
                        }
                    }
                });
               
                $stateProvider.state('blank', {});

                // States

                $stateProvider.state('home', {
                    url: '/',
                    views: {
                        content: {
                            templateUrl: 'ngviews/home.html',
                            controller: 'HomeCtrl'
                        }
                    }
                });

            }
        ]);

    if (window.ENVIRONMENT === 'production') {
        angular.bootstrap(document, ['webApp']);
    }
    
})();