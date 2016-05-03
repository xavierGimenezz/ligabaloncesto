'use strict';

angular.module('ligaBaloncestoApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('jugador', {
                parent: 'entity',
                url: '/jugadors',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'ligaBaloncestoApp.jugador.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/jugador/jugadors.html',
                        controller: 'JugadorController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('jugador');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('jugador.detail', {
                parent: 'entity',
                url: '/jugador/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'ligaBaloncestoApp.jugador.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/jugador/jugador-detail.html',
                        controller: 'JugadorDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('jugador');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Jugador', function($stateParams, Jugador) {
                        return Jugador.get({id : $stateParams.id});
                    }]
                }
            })
            .state('topPlayers', {
                parent: 'entity',
                url: '/jugadors/topPlayers',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'ligaBaloncestoApp.jugador.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/jugador/jugadorsTabla.html',
                        controller: 'TopPlayersController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('jugador');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Jugador', function($stateParams, Jugador) {
                        return Jugador.topPlayers({canastas : 50});
                    }]
                }
            })
            .state('asistPlayers', {
                parent: 'entity',
                url: '/jugadors/asistPlayers',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'ligaBaloncestoApp.jugador.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/jugador/jugadorsTabla.html',
                        controller: 'asistPlayersController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('jugador');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Jugador', function($stateParams, Jugador) {
                        return Jugador.asistPlayers({asistencias : 50});
                    }]
                }
            })
            .state('jugador.new', {
                parent: 'jugador',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/jugador/jugador-dialog.html',
                        controller: 'JugadorDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    nombre: null,
                                    fechaNacimiento: null,
                                    posicion: null,
                                    canastasTotales: null,
                                    asistenciasTotales: null,
                                    rebotesTotales: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('jugador', null, { reload: true });
                    }, function() {
                        $state.go('jugador');
                    })
                }]
            })
            .state('jugador.edit', {
                parent: 'jugador',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/jugador/jugador-dialog.html',
                        controller: 'JugadorDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Jugador', function(Jugador) {
                                return Jugador.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('jugador', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('jugador.delete', {
                parent: 'jugador',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/jugador/jugador-delete-dialog.html',
                        controller: 'JugadorDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Jugador', function(Jugador) {
                                return Jugador.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('jugador', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
