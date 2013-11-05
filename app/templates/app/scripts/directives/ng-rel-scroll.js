angular.module('ng-rel-scroll', []).directive('ngRelScroll', [function() {
    'use strict';
    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {

            var enabled = !Modernizr.touch && !(BrowserDetect.browser === 'Explorer' && BrowserDetect.version <= 9);

            var scrollChildren = element.find('.rel-scroll-child');

            var getLongest = function(els) {
                var $result, height = 0;
                $.each(els, function(i, el){
                    var $el = $(el);
                    var el_height = $el.get(0).scrollHeight;
                    if (el_height > height) {
                        $result = $el;
                        height = el_height;
                    }
                });
                return $result;
            };

            var equaliseHeights = function() {
                scrollChildren.css('height', 'auto');

                setTimeout(function(){
                    scrollChildren.css('height', getLongest(scrollChildren).height());
                }, 1000);
            };

            var resize = function() {
                if (enabled) {
                    $('html, body').scrollTop(0);
                    scroll();
                } else {
                    equaliseHeights();
                }
            };

            var scroll = function() {

                var win = $(this);

                var st = win.scrollTop();
                var eh = element.height();
                var dh = $(document).height();
                var wh = win.height();
                var scrollPercent = (st / (dh-wh));

                scrollPercent = scrollPercent > 1 ? 1 : scrollPercent;

                var longest = getLongest(scrollChildren);
                longest.css('top', 0);

                scrollChildren.not(longest).each(function(){
                    var $this = $(this);
                    
                    if ($this.height() <= eh) {
                        $this.css({position: 'fixed', top: 'auto'});

                    } else {
                        var maxST = longest.get(0).scrollHeight - (wh - longest.offset().top);

                        if (st <= maxST) {
                            var top = st - ((this.scrollHeight - wh + element.offset().top) * scrollPercent);
                            $this.css({position: 'absolute', top: Math.round(top)});
                        }
                    }
                });

            };

            if (enabled) {
                $(window).on('scroll.ngRelScroll', scroll);
            } else {
                equaliseHeights();
            }

            $(window).on('resize.ngRelScroll', resize);

            scope.$on('$destroy', function(){
                $(window)
                        .off('resize.ngRelScroll', resize)
                        .off('scroll.ngRelScroll', scroll);
            });

        }
    };
}]);