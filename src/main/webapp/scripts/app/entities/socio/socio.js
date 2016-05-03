'use strict';

angular.module('ligaBaloncestoApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('socio', {
                parent: 'entity',
                url: '/socios',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'ligaBaloncestoApp.socio.home.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/socio/socios.html',
                        controller: 'SocioController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('socio');
                        $translatePartialLoader.addPart('global');
                        return $translate.refresh();
                    }]
                }
            })
            .state('socio.detail', {
                parent: 'entity',
                url: '/socio/{id}',
                data: {
                    authorities: ['ROLE_USER'],
                    pageTitle: 'ligaBaloncestoApp.socio.detail.title'
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/entities/socio/socio-detail.html',
                        controller: 'SocioDetailController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('socio');
                        return $translate.refresh();
                    }],
                    entity: ['$stateParams', 'Socio', function($stateParams, Socio) {
                        return Socio.get({id : $stateParams.id});
                    }]
                }
            })
            .state('socio.new', {
                parent: 'socio',
                url: '/new',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/socio/socio-dialog.html',
                        controller: 'SocioDialogController',
                        size: 'lg',
                        resolve: {
                            entity: function () {
                                return {
                                    nombre: null,
                                    apellido: null,
                                    fechaNacimiento: null,
                                    id: null
                                };
                            }
                        }
                    }).result.then(function(result) {
                        $state.go('socio', null, { reload: true });
                    }, function() {
                        $state.go('socio');
                    })
                }]
            })
            .state('socio.edit', {
                parent: 'socio',
                url: '/{id}/edit',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/socio/socio-dialog.html',
                        controller: 'SocioDialogController',
                        size: 'lg',
                        resolve: {
                            entity: ['Socio', function(Socio) {
                                return Socio.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('socio', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            })
            .state('socio.delete', {
                parent: 'socio',
                url: '/{id}/delete',
                data: {
                    authorities: ['ROLE_USER'],
                },
                onEnter: ['$stateParams', '$state', '$modal', function($stateParams, $state, $modal) {
                    $modal.open({
                        templateUrl: 'scripts/app/entities/socio/socio-delete-dialog.html',
                        controller: 'SocioDeleteController',
                        size: 'md',
                        resolve: {
                            entity: ['Socio', function(Socio) {
                                return Socio.get({id : $stateParams.id});
                            }]
                        }
                    }).result.then(function(result) {
                        $state.go('socio', null, { reload: true });
                    }, function() {
                        $state.go('^');
                    })
                }]
            });
    });
