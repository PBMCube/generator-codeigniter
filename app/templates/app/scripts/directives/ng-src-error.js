angular.module('ng-src-error', []).directive('ngSrcError', [function() {
    'use strict';
    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {

            element.one("error", function(){
                var $img = $(this);
                var src = String($img.attr('src'));

                setTimeout(function(){
                    element.one("error", function(){
                        var $img = $(this);
                        var src = String($img.attr('src'));
                        $img.attr('src', 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7');
                        $img.attr("src", src.replace(
                            app.projectVars.s3Path+"cache/", app.projectVars.imagecachePath) +
                            "&bucket="+app.projectVars.bucketName + "&redirect=3");
                    });

                    $img.attr('src', src + '?retry=1');
                }, 1);
            });

        }
    };
}]);