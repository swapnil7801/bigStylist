/**
 * @ngdoc controller
 * @name angularApp.controller:LoginController
 * @description
 * # LoginController
 * Login Controller to validate user login
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['LoginService', 'toastr', '$location', 'StorageUtil', '$loading', '$window', '$rootScope'];

    function LoginController( LoginService, toastr, $location, StorageUtil, $loading, $window, $rootScope) {
        
        this.submitForm = function(loginForm) {
            if(loginForm.$valid) {                
                $loading.start('commonLoader');
                LoginService.validateUserLoginDetils(this.loginField.email, this.loginField.password).then(function(result){
                	console.log('result in login controller ='+JSON.stringify(result));
                    if(result.username!='' && result.username!=undefined) {
                        // toastr.success('You are valid User', {
                        //   closeButton: true
                        // });
                         
                        $loading.finish('commonLoader');
                        if(StorageUtil.setLocal('userId', result.userId)) {
                            $location.path('/home');
                            $window.location.reload();    
                        }
                        
                    } else {
						$loading.finish('commonLoader');
                        toastr.error('You are not a valid User', {
                          closeButton: true
                        });
                    }
                }, function(error){
                    $loading.finish('commonLoader');
                });
            }
        }
    }

})();