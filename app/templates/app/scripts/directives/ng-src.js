angular.module('ng-src', []).directive('ngSrc', [function() {
    'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngSrc', function(value) {
                if (!value) {
                    return;
                }

                if (attrs.ngSrcHideMobile !== undefined && ua.isMobile) {
                    value = 'data:image/gif;base64,' + 'R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
                }

                attrs.$set('src', value);

                var msie = parseInt(((/msie (\d+)/.exec(navigator.userAgent.toLowerCase()) || [])[1]), 10);
                if (msie) { element.prop('src', value); }
            });         
        }
    };
}]);