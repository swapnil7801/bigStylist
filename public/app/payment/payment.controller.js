/**
 * @ngdoc controller
 * @name angularApp.controller:PaymentController
 * @description
 * # PaymentController
 * Payment Controller  for Payment page
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('PaymentController', PaymentController);

    PaymentController.$inject = [ 'toastr', '$location', 'StorageUtil', '$loading'];

    function PaymentController(  toastr, $location, StorageUtil, $loading) {
         var vm = this;
           vm.showPayment = true;
           vm.toggleFlag = function() { //alert(social_type)
                vm.showPayment = ! vm.showPayment;    
           
        }
      //   this.submitForm = function(loginForm) {
      //       if(loginForm.$valid) {                
      //           $loading.start('commonLoader');
      //           LoginService.validateUserLoginDetils(this.loginField.ePayment, this.loginField.password).then(function(result){
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