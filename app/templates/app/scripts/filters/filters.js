(function() {
    'use strict';

    angular.module('webApp.filters')

    .filter('reverse', function() {
        return function(input, uppercase) {
            var out = "";
            for (var i = 0; i < input.length; i++) {
                out = input.charAt(i) + out;
            }
            // conditional based on optional argument
            if (uppercase) {
                out = out.toUpperCase();
            }
            return out;
        };
    })

    .filter('range', function() {
        return function(input, currentIndex) {
            var output = [];
            for (var i in input) {
                if (i > currentIndex - 8 && i < currentIndex + 6) {
                    output.push(input[i]);
                }
            }
            return output;
        };
    })

    .filter('encodeURI', function() {
        return function(input) {
            return window.encodeURI(input);
        };
    })

    .filter('encodeURIComponent', function() {
        return function(input) {
            return window.encodeURIComponent(input);
        };
    })

    .filter('fromNow', function() {
        return function(date) {
            return moment(date).fromNow();
        };
    })

    .filter('longDate', function() {
        return function(date) {
            return moment(date).format('Do MMMM YYYY');
        };
    })

    .filter('shortDate', function() {
        return function(date) {
            return moment(date).format('DD.MM.YY');
        };
    })

    .filter('pad', function() {
        return function(n, l, z) {
            z = z || '0';
            l = l || 2;
            n = n + '';
            return n.length >= l ? n : new Array(l - n.length + 1).join(z) + n;
        };
    })

    .filter('if', function() {
        return function(input, trueValue, falseValue) {
            return input ? trueValue : falseValue;
        };
    });

})();