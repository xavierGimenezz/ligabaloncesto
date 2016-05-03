'use strict';

angular.module('ligaBaloncestoApp')
    .controller('ArbitroDetailController', function ($scope, $rootScope, $stateParams, entity, Arbitro, Partido) {
        $scope.arbitro = entity;
        $scope.load = function (id) {
            Arbitro.get({id: id}, function(result) {
                $scope.arbitro = result;
            });
        };
        var unsubscribe = $rootScope.$on('ligaBaloncestoApp:arbitroUpdate', function(event, result) {
            $scope.arbitro = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
