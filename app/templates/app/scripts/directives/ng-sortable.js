angular.module('ng-sortable', []).directive('ngSortable', ['$timeout', function($timeout) {
    'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            scope.$watch(attrs.ngSortable, function(opts){

                $.fn.ready(function(){

                    $timeout(function(){

                        element.sortable(opts);

                        element.on('sortupdate', function(e, o){
                            if (opts.update !== undefined && typeof(opts.update) === 'function') {
                                opts.update(e, o);
                            }
                        });

                        element.on('dragstart', function(e){
                            if (opts.start !== undefined && typeof(opts.start) === 'function') {
                                opts.start(e);
                            }
                        });

                    }, 1000);

                });

            });

        }
    };
}]);