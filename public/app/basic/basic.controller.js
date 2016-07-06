/**
 * @ngdoc controller
 * @name angularApp.controller:BasicController
 * @description
 * # BasicController
 * BasicController for Basic page
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('BasicController', BasicController);

    BasicController.$inject = [ 'toastr', '$location', 'StorageUtil', '$loading', 'BasicService'];
    function BasicController(  toastr, $location, StorageUtil, $loading,BasicService) {
        
      var vm = this;
      vm.getConfigValues = function() {
        var input = {
              env_ip: '127.0.0.1',
              env_port: '8000'              
        };
        BasicService.getConfigValues(input).then(function(result) {
          //alert("success");
          console.log(" Result "+JSON.stringify(result,null,4));
          vm.info = result;   
          console.log('setting data in local'); 
          console.log(result.configRecords.length);
          StorageUtil.setLocal('configArr',result.configRecords);   
          console.log('local data = '+(StorageUtil.getLocal('configArr')));            
        }, function(error){
            //alert('error');
            console.log(" Error "+JSON.stringify(error,null,4));
        });
      }    
      vm.getConfigValues();   
    }
})();