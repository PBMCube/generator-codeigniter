angular.module('webApp.controllers', []);
angular.module('webApp.services', []);
angular.module('webApp.filters', []);

require.config({
    baseUrl: '/app/scripts',
    paths: {}
});

require([
    'webApp',
    '<?= implode("', '", $controllers) ?>',
    '<?= implode("', '", $services) ?>',
    '<?= implode("', '", $filters) ?>',
    '<?= implode("', '", $directives) ?>'
    ], function() {
    'use strict';

    $(function() {
        angular.bootstrap(document, ['webApp']);
    });
});