'use strict';

angular.module('ligaBaloncestoApp')
    .controller('EntrenadorController', function ($scope, $state, $modal, Entrenador, ParseLinks) {
      
        $scope.entrenadors = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Entrenador.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.entrenadors = result;
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
            $scope.entrenador = {
                nombre: null,
                fechaNacimiento: null,
                id: null
            };
        };
    });
