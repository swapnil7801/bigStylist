/**
 * @ngdoc controller
 * @name angularApp.controller:EmailTemplateController
 * @description
 * # EmailTemplateController
 * EmailTemplate Controller  
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('EmailTemplateController', EmailTemplateController);

    EmailTemplateController.$inject = [ 'toastr', '$location', 'StorageUtil', '$loading'];

    function EmailTemplateController(  toastr, $location, StorageUtil, $loading) {
        
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