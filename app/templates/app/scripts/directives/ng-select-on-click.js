angular.module('ng-select-on-click', []).directive('ngSelectOnClick', [function() {
    'use strict';
    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {

            element.on('click touchend', function(e){
                e.preventDefault();
                element.select();
            });
            
        }
    };
}]);