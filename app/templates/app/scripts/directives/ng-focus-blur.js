angular.module('ng-focus', []).directive('ngFocus', ['$parse',
    function($parse) {
        'use strict';
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var fn = $parse(attrs['ngFocus']);
                element.bind('focus', function(event) {
                    scope.$apply(function() {
                        fn(scope, {
                            $event: event
                        });
                    });
                });

            }
        };
    }
]);

angular.module('ng-blur', []).directive('ngBlur', ['$parse',
    function($parse) {
        'use strict';
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var fn = $parse(attrs['ngBlur']);
                element.bind('blur', function(event) {
                    scope.$apply(function() {
                        fn(scope, {
                            $event: event
                        });
                    });
                });

            }
        };
    }
]);