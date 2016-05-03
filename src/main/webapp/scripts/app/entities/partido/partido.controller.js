'use strict';

angular.module('ligaBaloncestoApp')
    .controller('PartidoController', function ($scope, $state, $modal, Partido, ParseLinks) {
      
        $scope.partidos = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Partido.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.partidos = result;
            });
        };
        $scope.loadPage = function(page) {
            $scope.page = page;
            $scope.loadAll();
        };
        $scope.loadAll();


        $scope.refresh = function () {
            $scope.loadAll();
            $scope.clear();
        };

        $scope.clear = function () {
            $scope.partido = {
                jornada: null,
                id: null
            };
        };
    });
