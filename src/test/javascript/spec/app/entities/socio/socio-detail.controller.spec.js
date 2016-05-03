'use strict';

describe('Socio Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockSocio, MockEquipo;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockSocio = jasmine.createSpy('MockSocio');
        MockEquipo = jasmine.createSpy('MockEquipo');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Socio': MockSocio,
            'Equipo': MockEquipo
        };
        createController = function() {
            $injector.get('$controller')("SocioDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'ligaBaloncestoApp:socioUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
