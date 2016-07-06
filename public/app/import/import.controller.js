/**
 * @ngdoc controller
 * @name angularApp.controller:ImportController
 * @description
 * # ImportController
 * Import Controller to import user 
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('ImportController', ImportController);

    ImportController.$inject = ['toastr', '$location', 'StorageUtil', '$loading'];

    function ImportController(toastr, $location, StorageUtil, $loading) {
        
      //   this.submitForm = function(loginForm) {
      //       if(loginForm.$valid) {                
      //           $loading.start('commonLoader');
      //           LoginService.validateUserLoginDetils(this.loginField.email, this.loginField.password).then(function(result){
      //               if(result.LoginStatus === true) {
      //                   // toastr.success('You are valid User', {
      //                   //   closeButton: true
      //                   // });
                         
      //                   $loading.finish('commonLoader');
      //                   if(StorageUtil.setLocal('userId', result.id)) {
      //                       $location.path('/home');    
      //                   }
                        
      //               } else {
						// $loading.finish('commonLoader');
      //                   toastr.error('You are not a valid User', {
      //                     closeButton: true
      //                   });
      //               }
      //           }, function(error){
      //               $loading.finish('commonLoader');
      //           });
      //       }
      //   }
    }

})();