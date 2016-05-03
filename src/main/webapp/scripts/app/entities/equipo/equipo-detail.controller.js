'use strict';

angular.module('ligaBaloncestoApp')
    .controller('EquipoDetailController', function ($scope, $rootScope, $stateParams, entity, maxCanastasJugador, jugadorMasVeterano, Equipo, Jugador, Estadio, Socio, Entrenador, Temporada) {
        $scope.equipo = entity;
        $scope.maxCanastasJugador = maxCanastasJugador;
        $scope.jugadorMasVeterano = jugadorMasVeterano;
        $scope.load = function (id) {
            Equipo.get({id: id}, function(result) {
                $scope.equipo = result;
            });
            Equipo.maxCanastasJugador({id: id}, function(result) {
                $scope.maxCanastasJugador = result;
            });
            Equipo.jugadorMasVeterano({id: id}, function(result) {
                $scope.jugadorMasVeterano = result;
            });
        };
        var unsubscribe = $rootScope.$on('ligaBaloncestoApp:equipoUpdate', function(event, result) {
            $scope.equipo = result;
        });
        $scope.$on('$destroy', unsubscribe);

    });
