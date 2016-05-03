/**
 * Created by Javi on 27/01/2016.
 */
'use strict'
angular.module('ligaBaloncestoApp')
.controller('modificacionCtrl', function($scope, Jugador, Equipo, entity) {
    $scope.allJugadores = entity;
    $scope.jugadorSel;
    $scope.equipos = Equipo.query();
    $scope.savedPlayers = [];

        //a la vista, assignar el savedPlayers coma ng-repeat

    $scope.cargarJugador = function(id){
        Jugador.get({id: id},function(result){
            $scope.jugadorSel = result;
        });
    };
    $scope.update = function(){
        Jugador.update($scope.jugadorSel, updateOK);
    };
    var updateOK = function(){
        $scope.allJugadores = Jugador.query();
    }

        $scope.topPlayers = function(){
            Jugador.topPlayers({canastas:45}), function(result){
                console.log(result);
                $scope.savedPlayers = result;
            }
        };

        $scope.topPlayers();
});
