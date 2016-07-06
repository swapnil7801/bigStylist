/**
 * @ngdoc overview
 * @name UtilApp
 * @description
 * # Common utilities app
 *
 * Main module of the application.
 */

'use strict';

angular
    .module("UtilApp", [
        'ngRoute',
        'ngAnimate', 
        'toastr'
    ])
    .config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('HttpErrorHandlerService');
    }])

    .run(function($rootScope, toastr) {
        $rootScope.addError = function(errorObj){
            console.log("errorObj----", errorObj);
            toastr.error(errorObj.reason.message, errorObj.message);
        }
    });