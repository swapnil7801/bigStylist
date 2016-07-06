/**
 * @ngdoc controller
 * @name angularApp.controller:IndexController
 * @description
 * # IndexController
 * Index Controller for index page
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['StorageUtil', '$location'];

    function IndexController(StorageUtil, $location) { alert("index controller");
    	var vm = this;
         vm.logoutUser = function() {alert("index controller");
            var status = StorageUtil.removeLocal('userId');
            if(status) {
                $location.path('/login');
            }
        }
         
    }

})();