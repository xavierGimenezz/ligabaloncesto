'use strict';

describe('Partido Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockPartido, MockArbitro;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockPartido = jasmine.createSpy('MockPartido');
        MockArbitro = jasmine.createSpy('MockArbitro');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Partido': MockPartido,
            'Arbitro': MockArbitro
        };
        createController = function() {
            $injector.get('$controller')("PartidoDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'ligaBaloncestoApp:partidoUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
