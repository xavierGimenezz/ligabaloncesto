'use strict';

angular.module('ligaBaloncestoApp')
	.controller('PartidoDeleteController', function($scope, $modalInstance, entity, Partido) {

        $scope.partido = entity;
        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Partido.delete({id: id},
                function () {
                    $modalInstance.close(true);
                });
        };

    });