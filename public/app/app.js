/**
 * @ngdoc module.
 * @name angularApp
 * @description
 * # angularApp
 * Main module of the application 
 */


 (function() {
    'use strict';
    angular
        .module('angularApp', [
            'UtilApp',
            'ngAria',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngSanitize',
            'ngTouch'
        ])  
        .factory('authInterceptor', function ($rootScope, $q, $window) {
              return {
                request: function (config) {
                  config.headers = config.headers || {};
                  if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                  }
                  return config;
                },
                responseError: function (rejection) {
                  if (rejection.status === 401) {
                    // handle the case where the user is not authenticated
                  }
                  return $q.reject(rejection);
                }
              };
        })
        .config(['$httpProvider',
            function($httpProvider) {    
                $httpProvider.interceptors.push('authInterceptor');
                //var access = routingConfig.accessLevels;            
                //console.log('access levels'+JSON.stringify(access,null,4));   
            }
        ])  
        .run(["$rootScope", "$location", function($rootScope, $location) {
            //$http.defaults.headers.common['authorization'] = 'Basic Z3RfY2FyczpndGNhcjp3ZWI=';
            $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
                if (eventObj.authenticated === false) {
                    $location.path("/login");
                } else {
                    $location.path(current);
                }
            });  
            //$http.defaults.headers.common['authorization'] ='Basic Z3RfY2FyczpndGNhcjp3ZWI=';     
        }])
        .run(['$http',function($http){
            $http.defaults.headers.common['authorization'] ='Basic d2ViX2Zyb250ZW5kOmJhY2tlbmQ=';
            //$http.defaults.headers.common['Accept'] = 'application/json;odata=verbose';
        }]);
        /**/
})();