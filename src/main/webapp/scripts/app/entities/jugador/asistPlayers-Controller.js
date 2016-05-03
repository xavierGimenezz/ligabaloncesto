'use strict';

angular.module('ligaBaloncestoApp')
    .controller('asistPlayersController', function ($scope, $rootScope, $stateParams, entity, Jugador, Equipo, ParseLinks) {

        entity.$promise.then(function(data){
            console.log(data);
            var link = entity.$httpHeaders('link');

            $scope.links = ParseLinks.parse(link);

            $scope.savedPlayers = data;
        });





    });
