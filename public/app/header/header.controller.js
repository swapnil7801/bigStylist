/**
 * @ngdoc controller
 * @name angularApp.controller:HeaderController
 * @description
 * # HeaderController
 * Header Controller loads home page data
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['StorageUtil', '$location', '$window'];

    function HeaderController(StorageUtil, $location, $window) {
    	var vm = this;
        vm.loggedInUser = StorageUtil.getLocal("userId");
        //alert(vm.loggedInUser);

        vm.logoutUser = function() {
            var status = StorageUtil.removeLocal('userId');
            if(status) {
                $location.path('/login');
            }
            $window.location.reload();
        }
    }

})();