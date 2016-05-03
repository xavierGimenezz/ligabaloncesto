'use strict';

describe('Equipo Detail Controller', function() {
    var $scope, $rootScope;
    var MockEntity, MockEquipo, MockJugador, MockEstadio, MockSocio, MockEntrenador, MockTemporada;
    var createController;

    beforeEach(inject(function($injector) {
        $rootScope = $injector.get('$rootScope');
        $scope = $rootScope.$new();
        MockEntity = jasmine.createSpy('MockEntity');
        MockEquipo = jasmine.createSpy('MockEquipo');
        MockJugador = jasmine.createSpy('MockJugador');
        MockEstadio = jasmine.createSpy('MockEstadio');
        MockSocio = jasmine.createSpy('MockSocio');
        MockEntrenador = jasmine.createSpy('MockEntrenador');
        MockTemporada = jasmine.createSpy('MockTemporada');
        

        var locals = {
            '$scope': $scope,
            '$rootScope': $rootScope,
            'entity': MockEntity ,
            'Equipo': MockEquipo,
            'Jugador': MockJugador,
            'Estadio': MockEstadio,
            'Socio': MockSocio,
            'Entrenador': MockEntrenador,
            'Temporada': MockTemporada
        };
        createController = function() {
            $injector.get('$controller')("EquipoDetailController", locals);
        };
    }));


    describe('Root Scope Listening', function() {
        it('Unregisters root scope listener upon scope destruction', function() {
            var eventType = 'ligaBaloncestoApp:equipoUpdate';

            createController();
            expect($rootScope.$$listenerCount[eventType]).toEqual(1);

            $scope.$destroy();
            expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
        });
    });
});
