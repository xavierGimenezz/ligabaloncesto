/**
 * Created by Javi on 27/01/2016.
 */
'use strict'
angular.module('ligaBaloncestoApp')
    .controller('creacionEquipoCtrl', function($scope, Equipo) {
        $scope.equipo;
        $scope.save = function () {
            $scope.isSaving = true;
            Equipo.save($scope.equipo, onSaveSuccess, onSaveError);
        };
        var onSaveSuccess = function (result) {
            $scope.isSaving = false;
        };
        var onSaveError = function (result) {
            $scope.isSaving = false;
        };
    })
    .factory("Equipo",function($resource){
        return $resource('api/equipos/:id', {}, {
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    return angular.toJson(data);
                }
            }
        });
    });
