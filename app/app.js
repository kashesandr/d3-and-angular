'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {

    var data = [];
    for (var i = 0; i < 100; i ++)
        data[i] = i;

    $scope.matrix = {
        data: data,
        options: {
            width: 400,
            height: 400
        }
    };
});

app.directive('d3Matrix', function(){
    return {
        restrict: "EA",
        scope: {
            data: "=data",
            options: "=options"
        },
        link: function (scope, element, attrs) {
            var chart = window.Matrix();

            for (var key in scope.options) {
                if (scope.options.hasOwnProperty(key)) {
                    var val = scope.options[key];
                    chart[key](val);
                }
            }

            var svg = d3.select(element[0]).append("svg");
            svg.datum(scope.data).call(chart);
        }
    }
});