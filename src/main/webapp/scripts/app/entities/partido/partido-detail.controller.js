'use strict';

angular.module('ligaBaloncestoApp')
    .controller('PartidoDetailController', function ($scope, $rootScope, $stateParams, entity, Partido, Arbitro) {
        $scope.partido = entity;
        $scope.load = function (id) {
            Partido.get({id: id}, function(result) {
                $scope.partido = result;
            });
        };
        var unsubscribe = $rootScope.$on('ligaBaloncestoApp:partidoUpdate', function(event, result) {
            $scope.partido = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
