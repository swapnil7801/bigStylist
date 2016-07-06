/**
 * @ngdoc controller
 * @name angularApp.controller:BackupController
 * @description
 * # BackupController
 * Backup Controller  for backup page
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('BackupController', BackupController);

    BackupController.$inject = [ 'toastr', '$location', 'StorageUtil', '$loading'];

    function BackupController(  toastr, $location, StorageUtil, $loading) {
          var vm = this;
          vm.isEdit = false;
          vm.showEditBtn = true;

         
          vm.toggleFlag = function(hide_param){
            if(hide_param = 'edit_button'){
              vm.showEditBtn = ! vm.showEditBtn;
              // alert("vm.isEdit before "+vm.isEdit);
              vm.isEdit = !vm.isEdit;               
              
              // alert("vm.isEdit after "+vm.isEdit);
            }
            
          };
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