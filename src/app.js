'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', []);

app.controller('myCtrl', function ($scope) {
    $scope.matrix = {
        data: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
        options: { width: 400, height: 400 }
    };
});

app.directive('d3Matrix', function(){
    return {
        restrict: "EA",
        scope: { data: "=data", options: "=options" },
        link: function (scope, element, attrs) {

            var chart = window.KashMatrix();
            var svg = window.d3.select(element[0]).append("svg");
            var render = function () { svg.call(chart) };

            scope.$watch('data', function(newVal, oldVal){
                svg.datum(newVal); render();
            }, true);

            scope.$watch('options', function(newVal, oldVal){
                for (var key in newVal)
                    if (newVal.hasOwnProperty(key))
                        chart[key](newVal[key]);
                render();
            }, true);

            render();

        }
    }
});