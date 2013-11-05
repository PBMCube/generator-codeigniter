angular.module('ng-simple-slides', []).directive('ngSimpleSlides', [function() {
    'use strict';
    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {

            element.on('click', function(){
                var current = $('img:visible', element);
                var currentIndex = current.index();
                var next = currentIndex >= $('img', element).length-1 ? 0 : currentIndex+1;

                current.hide();
                $('img', element).eq(next).show();
            });
        }
    };
}]);