angular.module('ng-swipeview', []).directive('ngSwipeview',
    ['$compile', function($compile) {
        'use strict';
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var watchSlides = scope.$watch('slides', function(){

                    if (scope.slides === undefined) {
                        return false;
                    }

                    watchSlides();

                    var slides = scope.slides;

                    var onChange = function(i){};
                    if (typeof(scope[attrs.onChange]) === 'function') {
                        onChange = scope[attrs.onChange];
                    }

                    var slider = new SwipeView(element.get(0), {
                        snapThreshold: 50,
                        numberOfPages: slides.length,
                        hastyPageFlip: true,
                        loop: (slides.length > 2)
                    });

                    scope[attrs.ngSwipeview] = slider;

                    for (var i = 0; i < 3; i++) {
                        $(slider.masterPages[i]).append('<span/>');
                    }

                    var fillPage = function(slide, page) {
                        // console.log('fillPage', slide, page);
                        $(slider.masterPages[slide]).find('span').html(slides[page]);
                        $compile(slider.masterPages[slide])(scope);                        
                    };

                    var init = function(idx) {
                        // console.log('init', slides.length, idx);
                        slider.updateOptions({
                            numberOfPages: slides.length,
                            loop: (slides.length > 2)                            
                        });

                        if (slides.length > 2) {
                            for (var i = 0; i < 3; i++) {
                                var page = i === 0 ? slides.length - 1 : i - 1;
                                fillPage(i, page);
                            }

                        } else if (slides.length === 2) {
                            fillPage(1, 0);
                            fillPage(2, 1);

                        } else if (slides.length === 1) {
                            fillPage(1, 0);
                        }

                        if (idx !== undefined) {
                            slider.goToSlide(idx);

                        } else if (slides.length > 1 && scope.currentSlide !== undefined && scope.currentSlide !== null) {
                            slider.goToSlide(scope.currentSlide);
                        }
                    };

                    slider.onFlip(function() {
                        // console.log('onFlip');
                        if (slides.length > 2) {
                            for (var i = 0; i < 3; i++) {
                                var upcomingPage = slider.masterPages[i].dataset.upcomingPageIndex;
                                if (upcomingPage !== slider.masterPages[i].dataset.pageIndex) {
                                    fillPage(i, upcomingPage);
                                }
                            }
                        }

                        onChange(slider.pageIndex);
                    });               

                    var _resize = function() {
                        element.css('line-height', element.height() + 'px');
                    };

                    var resizeTimeout;
                    var resize = function() {
                        if (resizeTimeout) {
                            clearTimeout(resizeTimeout);
                        }
                        resizeTimeout = setTimeout(function(){
                            _resize();
                        }, 201);
                    };

                    _resize();

                    slider.updateSlides = function(_slides, idx) {
                        slides = _slides;
                        init(idx);
                    };

                    slider.goToSlide = function(i) {
                        // console.log('goToSlide', i);
                        slider.goToPage(i);
                    };

                    slider.nextSlide = function() {
                        $('#swipeview-slider', element).addClass('click');
                        slider.next();
                    };

                    slider.prevSlide = function() {
                        $('#swipeview-slider', element).addClass('click');
                        slider.prev();
                    };

                    var keydown = function(e) {
                        switch (e.keyCode) {
                            case 37:
                                slider.prevSlide();
                            break;
                            case 39:
                                slider.nextSlide();
                            break;
                        }
                    };

                    $(window).on('resize.ngSwipeview', resize);

                    $(document).on('keydown.ngSwipeView', keydown);

                    scope.$on('$destroy', function(){
                        $(window).off('resize.ngSwipeview', resize);
                        $(document).off('keydown.ngSwipeView', keydown);
                    });

                    element.on("mousedown.ngSwipeview.preventDefault", "img", function(e){
                        e.preventDefault();
                    });

                    var cancel_click = false;

                    slider.onMoveOut(function() {
                        cancel_click = true;
                    });

                    slider.onMoveIn(function() {
                        cancel_click = true;
                    });

                    element.on(Modernizr.touch ? "touchstart.ngSwipeview" : "mousedown.ngSwipeview.click", ".slide", function() {
                        $("#swipeview-slider", element).removeClass("click");
                        cancel_click = false;
                    });

                    element.on(Modernizr.touch ? "touchend.ngSwipeview" : "mouseup.ngSwipeview", ".slide", function(e) {
                        if (!cancel_click) {
                            var x = Modernizr.touch ? e.originalEvent.changedTouches[0].screenX : e.screenX;

                            if (x < $(window).width() * 0.5) {
                                if (typeof(scope[attrs.prevSlide]) === 'function') {
                                    var prev = scope[attrs.prevSlide];
                                    prev();
                                } else {
                                    slider.prevSlide();
                                }

                            } else {
                                if (typeof(scope[attrs.nextSlide]) === 'function') {
                                    var next = scope[attrs.nextSlide];
                                    next();
                                } else {
                                    slider.nextSlide();
                                }
                            }
                        }
                    });

                    init();

                });

            }
        };
    }
]);