
angular.module('ligaBaloncestoApp')
    .config(function ($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise("/");
        $stateProvider
            .state('ej15', {
                url: '/ej15',
                data: {
                    pageTitle: 'Ej15'
                },
                views: {
                    'content@': {
                        templateUrl: 'ej15-extra.html',
                        controller: 'creacionJugadorCtrl'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Equipo', function($stateParams, Equipo) {
                        return Equipo.query();
                    }]
                }
            })
            .state('ej16', {
                url: '/ej16',
                data: {
                    pageTitle: 'Ej16'
                },
                views: {
                    'content@': {
                        templateUrl: 'ej16-extra.html',
                        controller: 'creacionEquipoCtrl'
                    }
                }
            })
            .state('ej17', {
                url: '/ej17',
                data: {
                    pageTitle: 'Ej17'
                },
                views: {
                    'content@': {
                        templateUrl: 'ej17-extra.html',
                        controller: 'modificacionCtrl'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Jugador', function($stateParams, Jugador) {
                        return Jugador.query();
                    }]
                }
            })
            .state('jugadoresCanastas', {
                url: '/jugadoresCanastas',
                data: {
                    pageTitle: 'jugadoresCanastas'
                },
                views: {
                    'content@': {
                        templateUrl: 'jugadoresCanastas.html',
                        controller: 'modificacionCtrl'
                    }
                },
                resolve: {
                    entity: ['$stateParams', 'Jugador', function($stateParams, Jugador) {
                        return Jugador.query();
                    }]
                }
            })
            .state('ej14', {
                url: '/ej14',
                data: {
                    pageTitle: 'Ej14'
                },
                views: {
                    'content@': {
                        templateUrl: 'ej14-extra.html',
                        controller: 'jugadorCtrl'
                    }
                }
            })

    });
