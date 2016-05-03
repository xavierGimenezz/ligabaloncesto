'use strict';

describe('Entrenador Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockEntrenador, MockEquipo;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockEntrenador = jasmine.createSpy('MockEntrenador');
        MockEquipo = jasmine.createSpy('MockEquipo');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Entrenador': MockEntrenador,
            'Equipo': MockEquipo
        };
        createController = function() {
            $injector.get('$controller')("EntrenadorDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'ligaBaloncestoApp:entrenadorUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
