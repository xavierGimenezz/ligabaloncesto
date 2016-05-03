'use strict';

angular.module('ligaBaloncestoApp').controller('ArbitroDialogController',
    ['$scope', '$stateParams', '$modalInstance', 'entity', 'Arbitro', 'Partido',
        function($scope, $stateParams, $modalInstance, entity, Arbitro, Partido) {

        $scope.arbitro = entity;
        $scope.partidos = Partido.query();
        $scope.load = function(id) {
            Arbitro.get({id : id}, function(result) {
                $scope.arbitro = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('ligaBaloncestoApp:arbitroUpdate', result);
            $modalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.arbitro.id != null) {
                Arbitro.update($scope.arbitro, onSaveSuccess, onSaveError);
            } else {
                Arbitro.save($scope.arbitro, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $modalInstance.dismiss('cancel');
        };
}]);
