/**
 * @ngdoc service
 * @name angularApp.service:HomeService
 * @description
 * # HomeService
 * Home Service for home controller
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .service('HomeService', HomeService);

    HomeService.$inject = ['$http', '$q'];

    function HomeService($http, $q) {

        var service = {
            getHomePageData: getHomePageData,
            setSocialData: setSocialData
        };

        return service;

        function getHomePageData() {

            var deferred = $q.defer();
            deferred.resolve({'content': "Welcome to home page"});
            return deferred.promise;
        }

        function setSocialData (social_name) {

            //alert(" setSocialData = "+social_name+"FB KEY ");
        }
    }

})();