'use strict';

angular.module('ligaBaloncestoApp')
    .factory('Estadio', function ($resource, DateUtils) {
        return $resource('api/estadios/:id', {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    data = angular.fromJson(data);
                    data.fechaConstruccion = DateUtils.convertLocaleDateFromServer(data.fechaConstruccion);
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    data.fechaConstruccion = DateUtils.convertLocaleDateToServer(data.fechaConstruccion);
                    return angular.toJson(data);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    data.fechaConstruccion = DateUtils.convertLocaleDateToServer(data.fechaConstruccion);
                    return angular.toJson(data);
                }
            }
        });
    });
