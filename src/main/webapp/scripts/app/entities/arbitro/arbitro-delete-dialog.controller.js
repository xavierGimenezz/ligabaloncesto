'use strict';

angular.module('ligaBaloncestoApp')
	.controller('ArbitroDeleteController', function($scope, $modalInstance, entity, Arbitro) {

        $scope.arbitro = entity;
        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
        $scope.confirmDelete = function (id) {
            Arbitro.delete({id: id},
                function () {
                    $modalInstance.close(true);
                });
        };

    });