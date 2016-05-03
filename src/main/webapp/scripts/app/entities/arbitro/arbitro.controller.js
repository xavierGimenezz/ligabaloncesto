'use strict';

angular.module('ligaBaloncestoApp')
    .controller('ArbitroController', function ($scope, $state, $modal, Arbitro, ParseLinks) {
      
        $scope.arbitros = [];
        $scope.page = 0;
        $scope.loadAll = function() {
            Arbitro.query({page: $scope.page, size: 20}, function(result, headers) {
                $scope.links = ParseLinks.parse(headers('link'));
                $scope.arbitros = result;
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
            $scope.arbitro = {
                nombre: null,
                id: null
            };
        };
    });
