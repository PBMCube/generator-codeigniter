(function() {
    'use strict';

    angular.module('ng-gridify', [])
        .directive('ngGridify', ['$log', '$timeout', function($log, $timeout) {
            return {
                restrict: 'A',
                link: function postLink(scope, element, attrs) {

					var defaults = {
						wrapperSelector: '.wrapper',
						tileSelector: '[data-ratio]',
						columns: 3,
						gutter: 0
					};

					var options = $.extend(defaults, scope.$eval(attrs.ngGridify));

					var _columns = function() {
						if (typeof(options.columns) === 'string') {
							if (typeof(scope[options.columns]) === 'function') {
								return scope[options.columns]();
							} else {
								$log.error('ngGridify: columns is not a function');
							}
						} else {
							return options.columns;
						}
					};

					var _gutter = function() {
						if (typeof(options.gutter) === 'string') {
							if (typeof(scope[options.gutter]) === 'function') {
								return scope[options.gutter]();
							} else {
								$log.error('ngGridify: gutter is not a function');
							}
						} else {
							return options.gutter;
						}
					};

					var _resize = function() {

						var totalWidth = element.width();

						var rows = [];
						var columns = _columns();
						var gutter = _gutter();

						var row = [];
						$.each(targets, function(i, t){
							if (row.length === columns) {
								rows.push(row);
								row = [];
							}
							row.push($(t));
						});
						rows.push(row);

						$.each(rows, function(i, r){
							var totalRatio = 0;
							$.each(r, function(ii, t){
								totalRatio += Number(t.attr('data-ratio'));
							});

							if (r.length === 1) {
								totalRatio *= 2;
							}

							$.each(r, function(ii, t){
								var tRatio = Number(t.attr('data-ratio'));
								var width = (tRatio / totalRatio) * (totalWidth - (gutter * (columns - 1)));
								var height = width * (1 / tRatio);

								var css = {
									width: width,
									height: height
								};

								if (ii < r.length-1) {
									css.marginRight = gutter;
								}

								if (i < rows.length-1) {
									css.marginBottom = gutter;
								}

								t.css(css);
							});
						});

						element.children(options.wrapperSelector).width(totalWidth + 1); // add 1 to prevent firefox sometimes wrapping tiles
					};

					var targets;

					$timeout(function(){

						targets = $(options.tileSelector, element);

						targets.css({
							float: 'left'
						});

						_resize();

					}, 1);

					$(window).on('resize', _resize);

                }
            };
        }]);

})();