/**
 * Created by Javi on 27/01/2016.
 */
'use strict'
angular.module('ligaBaloncestoApp')
    .controller('jugadorCtrl', function($scope, $http) {
        $http.get("api/jugadors").then(function (response) {
            $scope.jugadores = response.data;
        });
        $scope.filtrarPor = function(filtro){
            $scope.filtracion = filtro;
        };
    });
