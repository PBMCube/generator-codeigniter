angular.module('webApp.controllers', []);
angular.module('webApp.services', []);
angular.module('webApp.filters', []);

require.config({
    baseUrl: '/app/scripts',
    paths: {}
});

require([
    'webApp',
    'controllers/App', 'controllers/Home',
    // 'services/services',
    // 'filters/filters',
    // 'directives/angular-gm-0.1.1.min', 'directives/ng-focus-blur', 'directives/ng-iscroll', 'directives/ng-no-drag', 'directives/ng-rel-scroll', 'directives/ng-select-on-click', 'directives/ng-simple-slides', 'directives/ng-sortable', 'directives/ng-src-error', 'directives/ng-src', 'directives/ng-swipeview', 'directives/ng-vimeo-replace', 'directives/ng-wait-for-images'
], function () {
    'use strict';

    $(function () {
        angular.bootstrap(document, ['webApp']);
    });
});