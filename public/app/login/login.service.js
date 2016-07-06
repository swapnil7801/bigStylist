/**
 * @ngdoc service
 * @name angularApp.service:LoginService
 * @description
 * # LoginService
 * Login Service for login controller
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .service('LoginService', LoginService);

    LoginService.$inject = ['$http', '$q', '$window'];

    function LoginService($http, $q, $window) {

        var service = {
            validateUserLoginDetils: validateUserLoginDetils
        };

        return service;

        function validateUserLoginDetils(userName, password) {
            var deferred = $q.defer();
            var postData = {'username': userName, 'password': password};

            $http.post('http://localhost:8000/api/login', postData).then(function(res) {
                if(res) {
                    //deferred.resolve(response.data);
                    console.log('in the login service');
                    console.log("res "+JSON.stringify(res,null,4));
                    $window.sessionStorage.token = res.data.token;
                    var encodedProfile = res.data.token.split('.')[1];
                    console.log('encodedProfile '+encodedProfile);
                    var user = JSON.parse(url_base64_decode(encodedProfile));
                    deferred.resolve(user);
                }                
            }, function(error) {
                console.log(error);
                delete $window.sessionStorage.token;
                $scope.isAuthenticated = false;
                deferred.reject(error);
            });

            return deferred.promise;
        }
        function url_base64_decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
              switch (output.length % 4) {
                case 0:
                  break;
                case 2:
                  output += '==';
                  break;
                case 3:
                  output += '=';
                  break;
                default:
                  throw 'Illegal base64url string!';
              }
              console.log('url_base64_decode output ='+output);
              return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
        }
    }
})();