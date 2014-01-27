console.log('DEFAULT main.js');

angular.module('webApp.controllers', []);
angular.module('webApp.services', []);
angular.module('webApp.filters', []);

require.config({
    baseUrl: '/app/scripts',
    paths: {}
});

require([
    'webApp',
    'controllers/App', 'controllers/Home'
], function () {
    'use strict';

    $(function () {
        angular.bootstrap(document, ['webApp']);
    });
});