/**
 * @ngdoc service
 * @name angularApp.service:BackupService
 * @description
 * # BackupService
 * Backup Service for backup controller
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .service('BackupService', BackupService);

    BackupService.$inject = ['$http', '$q'];

    function BackupService($http, $q) {

        var service = {
            //validateUserLoginDetils: validateUserLoginDetils
        };

        return service;

        // function validateUserLoginDetils(userName, password) {
        //     var deferred = $q.defer();
        //     var postData = {'userName': userName, 'password': password};

        //     $http.post('http://localhost:8002/api/login', postData).then(function(response) {
        //         if(response && response.data) {
        //             deferred.resolve(response.data);
        //         }                
        //     }, function(error) {
        //         console.log(error);
        //         deferred.reject(error);
        //     });

        //     return deferred.promise;
        // }
    }
})();