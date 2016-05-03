'use strict';

angular.module('ligaBaloncestoApp')
    .factory('Jugador', function ($resource, DateUtils) {
        return $resource('api/jugadors/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaNacimiento = DateUtils.convertLocaleDateFromServer(data.fechaNacimiento);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.fechaNacimiento = DateUtils.convertLocaleDateToServer(data.fechaNacimiento);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.fechaNacimiento = DateUtils.convertLocaleDateToServer(data.fechaNacimiento);
                    return angular.toJson(data);
                }
            },
            'topPlayers': {
                method: 'GET', isArray: true, url: 'api/topPlayers/:canastas',
                interceptor: {
                    response: function (response) {
                        response.resource.$httpHeaders = response.headers;
                        return response.resource;
                    }
                }
            },'asistPlayers': {
                method: 'GET', isArray: true, url: 'api/asistPlayers/:asistencias',
                interceptor: {
                    response: function (response) {
                        response.resource.$httpHeaders = response.headers;
                        return response.resource;
                    }
                }

            }
        });
    });
