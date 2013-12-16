angular.module('ng-rel-scroll', []).directive('ngRelScroll', ['$window', function($window) {
    'use strict';
    return {
        restrict: 'AC',
        link: function(scope, element, attrs) {

            var enabled = !Modernizr.touch && !(BrowserDetect.browser === 'Explorer' && BrowserDetect.version <= 9);

            var eh, dh, wh, longest;

            var transformProp = Modernizr.prefixed('transform');

            var scrollChildren = element.find('.rel-scroll-child');

            scrollChildren.css('-webkit-backface-visibility', 'hidden');

            var getLongest = function(els) {
                var $result, height = 0;
                $.each(els, function(i, el){
                    var $el = $(el);
                    var el_height = $el[0].scrollHeight;

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

                    eh = element.height();
                    dh = $(document).height();
                    wh = $window.innerHeight;

                    longest = getLongest(scrollChildren);

                } else {
                    equaliseHeights();
                }
            };

            var scroll = function() {

                var st = window.scrollY;

                var scrollPercent = (st / (dh - wh));

                scrollPercent = scrollPercent > 1 ? 1 : scrollPercent;

                longest[0].style.position = 'absolute';
                longest[0].style[transformProp] = 'translate3d(0px, 0px, 0px)';
                if (/rel-scroll-fixed/g.test(longest[0].className)) {
                    longest[0].className = longest[0].className.replace(/rel-scroll-fixed/g, '').replace(/^\s+|\s+$/g, '');
                }

                for (var i in scrollChildren) {
                    var _this = scrollChildren[i];

                    if (typeof(_this) !== 'object') {
                        return false;
                    }

                    if (_this !== longest[0]) {
                        if (_this.scrollHeight <= eh) {

                            _this.style.position = 'fixed';
                            _this.style[transformProp] = 'translate3d(0px, 0px, 0px)';
                            if (!/rel-scroll-fixed/g.test(_this.className)) {
                                _this.className = _this.className.split(' ').concat(['rel-scroll-fixed']).join(' ');
                            }

                        } else {
                            var maxST = longest[0].scrollHeight - (wh - longest[0].offsetTop - element[0].offsetTop);

                            if (st <= maxST) {
                                var top = st - ((_this.scrollHeight - wh + element[0].offsetTop) * scrollPercent);

                                _this.style.position = 'absolute';
                                _this.style[transformProp] = 'translate3d(0px, '+top+'px, 0px)';
                                if (/rel-scroll-fixed/g.test(_this.className)) {
                                    _this.className = _this.className.replace(/rel-scroll-fixed/g, '').replace(/^\s+|\s+$/g, '');
                                }

                            }
                        }
                    }
                }

            };

            $(window).on('resize.ngRelScroll', resize);

            resize();

            if (enabled) {
                $(window).on('scroll.ngRelScroll', scroll);

            } else {
                equaliseHeights();
            }

            scope.$on('$destroy', function(){
                $(window)
                        .off('resize.ngRelScroll', resize)
                        .off('scroll.ngRelScroll', scroll);
            });

        }
    };
}]);