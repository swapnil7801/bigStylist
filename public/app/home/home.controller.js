/**
 * @ngdoc controller
 * @name angularApp.controller:HomeController
 * @description
 * # HomeController
 * Home Controller loads home page data
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['BasicService', 'StorageUtil', '$location', '$window', '$route'];

    function HomeController(BasicService, StorageUtil, $location, $window, $route) {
    	
        var vm = this;
         vm.showFb = true;
         vm.showTw = true;
         vm.showGPlus = true;
         vm.loadHomePageData = function() {
            var input = {
              env_ip: '127.0.0.1',
              env_port: '8000'              
            };
            //console.log('session data = '+JSON.stringify(StorageUtil.getLocal('configArr')));
            BasicService.getConfigValues(input).then(function(result) {
              //alert("success");
              console.log(" Result "+JSON.stringify(result,null,4)); 
              for(var i=0;i<result.configRecords.length;i++){
              	if((result.configRecords[i].key).indexOf('facebook_app_id')>-1){
              		vm.facebook_app_id_value=result.configRecords[i].value;
              	}else if((result.configRecords[i].key).indexOf('facebook_app_secret')>-1){
              		vm.facebook_app_secret_value=result.configRecords[i].value;
              	}else if((result.configRecords[i].key).indexOf('facebook_callbackurl')>-1){
              		vm.facebook_callbackurl_value=result.configRecords[i].value;
              	}else if((result.configRecords[i].key).indexOf('twitter_app_id')>-1){
              		vm.twitter_app_id_value=result.configRecords[i].value;
              	}else if((result.configRecords[i].key).indexOf('twitter_app_secret')>-1){
              		vm.twitter_app_secret_value=result.configRecords[i].value;
              	}else if((result.configRecords[i].key).indexOf('twitter_callbackurl')>-1){
              		vm.twitter_callbackurl_value=result.configRecords[i].value;
              	}else if((result.configRecords[i].key).indexOf('google_app_id')>-1){
              		vm.google_app_id_value=result.configRecords[i].value;
              	}else if((result.configRecords[i].key).indexOf('google_app_secret')>-1){
              		vm.google_app_secret_value=result.configRecords[i].value;
              	}else if((result.configRecords[i].key).indexOf('google_callbackurl')>-1){
              		vm.google_callbackurl_value=result.configRecords[i].value;
              	}
              }             
              //vm.info = result;                        
            }, function(error){
                //alert('error');
                console.log(" Error "+JSON.stringify(error,null,4));
            });
        }    
           
    

        vm.toggleFlag = function(social_type) { //alert(social_type)
            if(social_type == "facebook") {
                vm.showFb = ! vm.showFb;    
            }
            if(social_type == "twitter") {
                vm.showTw = ! vm.showTw;    
            }
            if(social_type == "google-plus") {
                vm.showGPlus = ! vm.showGPlus;    
            }
        }

        vm.saveSocailData = function(social_name) {
            
            HomeService.setSocialData(social_name).then(function (success) {
                // body...
            }, function  (error) {
                // body...
            });
        }
        vm.logoutUser = function() {
            var status = StorageUtil.removeLocal('userId');
            if(status) {
                $location.path('/login');
            }
        }

        vm.loadHomePageData();
    }

})();