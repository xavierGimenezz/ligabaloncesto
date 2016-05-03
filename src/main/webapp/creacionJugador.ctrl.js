/**
 * Created by Javi on 27/01/2016.
 */
'use strict'
angular.module('ligaBaloncestoApp')
    .controller('creacionJugadorCtrl', function($scope, Jugador, Equipo, entity) {
        $scope.equipos = entity;
        /*$scope.getEquipos = function(){
            Equipo.query({},function(result) {
                $scope.equipos = result;
            });
        };*/
        $scope.jugador;
        $scope.save = function () {
            $scope.isSaving = true;
            Jugador.save($scope.jugador, onSaveSuccess, onSaveError);
        };
        var onSaveSuccess = function (result) {
            $scope.isSaving = false;
        };
        var onSaveError = function (result) {
            $scope.isSaving = false;
        };
    })
    .factory("Jugador",function($resource){
        return $resource('api/jugadors/:id', {}, {
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    return angular.toJson(data);
                }
            }
        });
    });
