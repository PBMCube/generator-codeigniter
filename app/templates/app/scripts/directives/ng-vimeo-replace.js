angular.module('ng-vimeo-replace', []).directive('ngVimeoReplace', [function() {
    'use strict';
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            attrs.$observe('ngVimeoReplace', function(value) {
                if (!value) {
                    return;
                }

                element.on( (Modernizr.touch ? 'touchend' : 'click') , function(e){

                    e.preventDefault();

                    if (typeof(scope.vimeoReplace) === 'function') {
                        scope.vimeoReplace();
                    }

                    var vimeoWrapper = $('<div class="vimeo-wrapper"></div>').hide().insertBefore(element);

                    var vimeoIframe = $('<iframe'+
                                            ' class="asset vimeo"'+
                                            ' id="vimeo_'+value+'"'+
                                            ' data-ratio="1.775"'+
                                            ' src="http://player.vimeo.com/video/'+value+'?api=1&width=100&height=100&autoplay=1&player_id=vimeo_'+value+'"'+
                                            ' width="100%"'+
                                            ' height="100%"'+
                                            ' frameborder="0"'+
                                            ' webkitAllowFullScreen allowFullScreen'+
                                        '></iframe>');

                    vimeoIframe.appendTo(vimeoWrapper);

                    if (Modernizr.touch) {
                        vimeoWrapper.show();
                        element.remove();

                    } else {
                        var player = $f(vimeoIframe.get(0));

                        player.addEvent('ready', function(){
                            vimeoWrapper.show();
                            element.remove();

                            player.api('play');
                        });
                    }
                    
                });

            });         
        }
    };
}]);