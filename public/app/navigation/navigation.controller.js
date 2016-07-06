/**
 * @ngdoc controller
 * @name angularApp.controller:NavigationController
 * @description
 * # NavigationController
 * Navigation Controller to navigate between pages 
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('NavigationController', NavigationController);

    NavigationController.$inject = ['StorageUtil', '$location', '$window', '$route', '$rootScope'];

    function NavigationController(StorageUtil, $location, $window, $route, $rootScope) {
    	var vm = this;
        vm.loggedInUser = StorageUtil.getLocal("userId");
        //alert( vm.loggedInUser);
     

         vm.$route = $route;
        //alert(vm.loggedInUser);

        /*vm.logoutUser = function() {
            var status = StorageUtil.removeLocal('userId');
            if(status) {
                $location.path('/login');
            }
            $window.location.reload();
        }*/
    }

})();