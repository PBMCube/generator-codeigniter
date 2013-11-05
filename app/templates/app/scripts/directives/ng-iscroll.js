angular.module('ng-iscroll', []).directive('ngIscroll', [
    function() {
        'use strict';
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var iscrollName = attrs.ngIscroll;

                var unregister = scope.$watch(iscrollName, function() {

                    if (scope[iscrollName] === undefined) {
                        return false;
                    }

                    unregister();

                    var iscrollOpts = scope[iscrollName];

                    scope[iscrollName] = new iScroll(element[0], iscrollOpts);

                });

            }
        };
    }
]);