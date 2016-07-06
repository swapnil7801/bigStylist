(function() {
    
    'use strict';

    angular
        .module('UtilApp')
        .factory('HttpErrorHandlerService', HttpErrorHandlerService);

    HttpErrorHandlerService.$inject = ['CONSTANTS', '$window', '$q'];

    function HttpErrorHandlerService(CONSTANTS, $window, $q) {
        var HttpServiceErrorHandler = {
            request: function(config) {
                config.requestTimestamp = new Date().getTime();
                config.withCredentials = true;
                config.useXDomain = true;
                return config;
            },
            response: function(response) {
                response.config.responseTimestamp = new Date().getTime();
                return response;
            },
            responseError: function(rejection) {
                console.log("Response Error:  ", rejection);
                if(rejection.config.customMethodName && CONSTANTS.COMMON_HANDLER_SERVICE_METHODS.indexOf(rejection.config.customMethodName) > -1) {
                    var errorMsg = '';
                    switch(rejection.status) {            
                        case 0:
                            errorMsg = CONSTANTS.NETWORK_ERROR_MSG.STATUS_0;
                            break;

                        case 401:
                            errorMsg = CONSTANTS.NETWORK_ERROR_MSG.STATUS_401;
                            break;

                        case 405:
                            errorMsg = CONSTANTS.NETWORK_ERROR_MSG.STATUS_405;
                            break;

                        case 500:
                            errorMsg = CONSTANTS.NETWORK_ERROR_MSG.STATUS_500;
                            break;

                        case 404:
                            errorMsg = CONSTANTS.NETWORK_ERROR_MSG.STATUS_404;
                            break;

                        case 400:
                            errorMsg = CONSTANTS.NETWORK_ERROR_MSG.STATUS_400;
                            break;

                        default:
                            errorMsg = CONSTANTS.NETWORK_ERROR_MSG.UNKNOWN;
                            break;                    
                    }
                    sessionStorage.setItem('ErrorPageObj', JSON.stringify({'errorMsg': errorMsg}));
                    if(CONSTANTS.PRODUCTION_ENV === true) {
                        //$window.location.href = '/error.shtml';
                    }
                } else {
                    return $q.reject(rejection)//rejection;

                }
            }
        };
        return HttpServiceErrorHandler;
    }

})();