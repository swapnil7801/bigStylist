/**
 * @ngdoc service
 * @name angularApp.service:BasicService
 * @description
 * # BasicService
 * Basic Service for Basic controller
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .service('BasicService', BasicService);

    BasicService.$inject = ['$http', '$q'];

    function BasicService($http, $q) {

        var service = {
            getConfigValues: getConfigValues
        };

        return service;

        function getConfigValues(input) {
             var deferred = $q.defer();            

             $http.post('http://localhost:8000/api/config', input).then(function(response) {
                 if(response && response.data) {
                    //sessionStorage.data = response.data;                    
                    deferred.resolve(response.data);
                 }                
             }, function(error) {
                 console.log(error);
                 deferred.reject(error);
             });

             return deferred.promise;
        }
    }
})();