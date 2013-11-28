(function() {
	'use strict';

	angular.module('ng-columnify', [])
		.directive('ngColumnify', ['$log', '$timeout',
			function($log, $timeout) {
				return {
					restrict: 'A',
					transclude: true,
					template: '<div class="item" ng-transclude></div>',
					compile: function(_element, _attr, linker) {
						return function link(scope, element, attr) {

							var expression = attr.ngColumnify;
							var match = expression.match(/^\s*(.+)\s+in\s+(.*?)\s*$/);
							var valueIdentifier, listIdentifier;

							if (!match) {
								$log.error('Expected ngColumnify in form of "_item_ in _array_" but got "' + expression + '".');
							}

							valueIdentifier = match[1];
							listIdentifier = match[2];

							var defaults = {
								columns: 2
							};

							var options = $.extend(defaults, scope.$eval(attr.ngColumnifyOptions));

							var _columns = function() {
								if (typeof(options.columns) === 'string') {
									if (typeof(scope[options.columns]) === 'function') {
										return scope[options.columns]();
									} else {
										$log.error('ngColumnify: columns is not a function');
									}
								} else {
									return options.columns;
								}
							};

							var templateItem = element.children();
							element.children().remove();
							$('<!-- ngColumnify -->').insertBefore(element);

							function _linker(item) {
								linker(item.scope, function(clone) {
									var itemClone = templateItem.clone();
									itemClone.children().replaceWith(clone);
									item.element = itemClone;
								});
							}

							var firstLoad = true, colsArr = [], items = [];
							scope.columns = _columns();
							
							var _createItems = function() {
								for (var i = items.length; i < scope[listIdentifier].length; i++) {
									var item = {};
									item.scope = scope.$new();
									items.push(item);

									_linker(item);
								}

                                for (i = 0; i < items.length; i++) {
                                    items[i].scope[valueIdentifier] = scope[listIdentifier][i];

                                    if (!items[i].scope.$$phase) {
                                        items[i].scope.$apply();
                                    }
                                }
							};

							var _shortestCol = function() {
								var shortest = 0;
								for (var i in colsArr) {
									if (i > 0) {
										if (colsArr[i].height < colsArr[i - 1].height) {
											shortest = i;
										}
									}
								}
								return colsArr[shortest];
							};

							var _setupColumns = function() {
								element.attr('data-columns', scope.columns);

								$('.column', element).remove();

								colsArr = [];
								for (var i = 0; i < Math.max(1, scope.columns); i++) {
									colsArr.unshift({
										$el: $('<div class="column"/>').prependTo(element),
										height: 0
									});
								}								
							};

							var _appendItems = function(_items) {
								$.each(_items, function(i, item) {
									var col = _shortestCol();

									item.element.appendTo(col.$el);

									col.height += item.element.height();
								});								
							};

							var _flow = function(_items) {
								var tmp = $('<div class="temp" style="visibility: hidden;" />').appendTo(element);

								$.each(_items, function(i, item) {
									item.element.appendTo(tmp);
								});

								$timeout(function(){
									_appendItems(_items);

									tmp.remove();
								}, 0);
							};

							var _reflow = function() {
								_setupColumns();

								_appendItems(items);
							};

							var _resize = function() {
								scope.columns = _columns();

								if (!scope.$$phase) {
									scope.$apply();
								}
							};

							$timeout(function(){

								_setupColumns();

								_createItems();

								_flow(items);

								firstLoad = false;

							}, 0);

							var watchItems = scope.$watch(listIdentifier, function(n, o) {
								if (firstLoad) { return false; }

								_createItems();

								var newItems = [];
								for (var i = 0; i < n.length - o.length; i++) {
									newItems.push(items[o.length + i]);
								}

								_flow(newItems);
							});

							var watchCols = scope.$watch('columns', function(n, o) {
								if (firstLoad) { return false; }

								_reflow();
							});

							$(window).on('resize.ngColumnify', _resize);

							scope.$on('$destroy', function(){
                                $(window).off('resize.ngColumnify', _resize);
                                watchItems();
                                watchCols();
                            });

						};
					}
				};
			}
		]);

})();