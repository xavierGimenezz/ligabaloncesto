'use strict';

angular.module('ligaBaloncestoApp')
    .controller('SocioController', function ($scope, $state, $modal, Socio, ParseLinks) {
      
        $scope.socios = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Socio.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.socios = result;
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
            $scope.socio = {
                nombre: null,
                apellido: null,
                fechaNacimiento: null,
                id: null
            };
        };
    });
