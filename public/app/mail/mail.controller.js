/**
 * @ngdoc controller
 * @name angularApp.controller:MailController
 * @description
 * # MailController
 * Mail Controller  for Mail page
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('MailController', MailController);

    MailController.$inject = [ 'toastr', '$location', 'StorageUtil', '$loading', '$route'];

    function MailController(  toastr, $location, StorageUtil, $loading, $route) {
          var vm = this;
         vm.showGmail = true;
         vm.$route = $route;

         vm.toggleFlag = function() { //alert(social_type)
                vm.showGmail = ! vm.showGmail;    
           
        }

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