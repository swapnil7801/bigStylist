/**
 * @ngdoc controller
 * @name angularApp.controller:StorageController
 * @description
 * # StorageController
 * Storage Controller  for Storage page
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('StorageController', StorageController);

    StorageController.$inject = [ 'toastr', '$location', 'StorageUtil', '$loading'];

    function StorageController(  toastr, $location, StorageUtil, $loading) {
         var vm = this;
         vm.showStorage = true;
         vm.toggleFlag = function() { //alert(social_type)
               vm.showStorage = ! vm.showStorage;    
           
        }
      //   this.submitForm = function(loginForm) {
      //       if(loginForm.$valid) {                
      //           $loading.start('commonLoader');
      //           LoginService.validateUserLoginDetils(this.loginField.eStorage, this.loginField.password).then(function(result){
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