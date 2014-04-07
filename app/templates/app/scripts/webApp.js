(function() {

    'use strict';

    var webApp = angular.module('webApp', [
        'ui.router',
        'ngSanitize',
        'ngAnimate',
        'webApp.controllers',
        'webApp.services',
        'webApp.filters',
        'webApp.templates',

        // Add directives here
        'ng-no-drag'
    ]);

    webApp.config(
        ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$httpProvider', '$provide', '$sceDelegateProvider', '$sceProvider', '$anchorScrollProvider', '$uiViewScrollProvider',
            function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $provide, $sceDelegateProvider, $sceProvider, $anchorScrollProvider, $uiViewScrollProvider) {

                $locationProvider.html5Mode(true);

                // Disable security to allow untrusted urls...
                // $sceProvider.enabled(false);

                // ... or whitelist them
                $sceDelegateProvider.resourceUrlWhitelist([
                    'self',
                    'http://mybucket.s3.amazonaws.com/**'
                ]);

                // Overrides

                // Kill default ng-src
                $provide.decorator('ngSrcDirective', ['$delegate', '$sniffer',
                    function($delegate, $sniffer) {
                        var directive = $delegate[0].compile = function(element, attrs) {};
                        return $delegate;
                    }
                ]);

                // Kill ui-router scoll into view
                // $uiViewScrollProvider.useAnchorScroll();
                // $anchorScrollProvider.disableAutoScrolling();

                // Send data as form vars by default
                // $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

                // Routing

                $urlRouterProvider.otherwise('/');

                // Deal with missing trailing slash
                $urlRouterProvider.rule(function($injector, $location) {
                    var path = $location.path(),
                        search = $location.search();
                    if (path[path.length - 1] !== '/') {
                        if (Object.keys(search).length === 0) {
                            return path + '/';
                        } else {
                            var params = [];
                            angular.forEach(search, function(v, k) {
                                params.push(k + '=' + v);
                            });
                            return path + '/?' + params.join('&');
                        }
                    }
                });

                $stateProvider.state('blank', {});

                // States

                $stateProvider.state('main', {
                    abstract: true,
                    views: {
                        main: {}
                    }
                });

                $stateProvider.state('main.home', {
                    url: '/',
                    views: {
                        content: {
                            templateUrl: 'templates/home.html',
                            controller: 'HomeCtrl'
                        }
                    }
                });

            }
        ]);

    angular.bootstrap(document, ['webApp']);

})();
