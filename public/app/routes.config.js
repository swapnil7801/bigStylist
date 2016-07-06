/**
 * @ngdoc config
 * @name angularApp.config:routesConfig
 * @description
 * # routesConfig
 * routesConfig used to maintain the routes for angularApp
 */

(function() {
    'use strict';

    angular
        .module('angularApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$routeProvider', '$locationProvider'];

    function RoutesConfig($routeProvider, $locationProvider) {
    
        $routeProvider
            .when('/home', {
                templateUrl: 'app/home/home.html',
                controller: 'HomeController',
                controllerAs: 'homeCtrl',
                activetab: 'home',
                resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {
                            return $q.resolve();
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/import', {
                templateUrl: 'app/import/import.html',
                controller: 'ImportController',
                controllerAs: 'importCtrl',
                activetab: 'import',
                resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {
                            return $q.resolve();
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/export', {
                templateUrl: 'app/export/export.html',
                controller: 'ExportController',
                controllerAs: 'exportCtrl',
                activetab: 'export',
                resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {
                            return $q.resolve();
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/emailtemplate', {
                templateUrl: 'app/emailtemplate/emailtemplate.html',
                controller: 'EmailTemplateController',
                controllerAs: 'emailtemplateCtrl',
                activetab: 'emailtemplate',
                resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {
                            return $q.resolve();
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/backup', {
                templateUrl: 'app/backup/backup.html',
                controller: 'BackupController',
                controllerAs: 'backupCtrl',
                activetab: 'backup',
                resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {
                            return $q.resolve();
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/mail', {
                templateUrl: 'app/mail/mail.html',
                controller: 'MailController',
                controllerAs: 'mailCtrl',
              //  activetab: 'mail',
                resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {
                            return $q.resolve();
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/payment', {
                templateUrl: 'app/payment/payment.html',
                controller: 'PaymentController',
                controllerAs: 'paymentCtrl',
              //  activetab: 'payment',
                resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {
                            return $q.resolve();
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/storage', {
                templateUrl: 'app/storage/storage.html',
                controller: 'StorageController',
                controllerAs: 'storageCtrl',
             //   activetab: 'storage',
                resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {
                            return $q.resolve();
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/basic', {
                templateUrl: 'app/basic/basic.html',
                controller: 'BasicController',
                controllerAs: 'basicCtrl',
                // activetab: 'login',
                 resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {
                            return $q.resolve();
                        } else {
                            return $q.reject({
                                authenticated: false
                            });
                        }
                    }]
                }
            })
            .when('/login', {
                templateUrl: 'app/login/login.html',
                controller: 'LoginController',
                controllerAs: 'loginCtrl',
                // activetab: 'login',
                resolve: {
                    auth: ["$q", "loginAuthenticationFactory", function($q, loginAuthenticationFactory) {
                        var userId = loginAuthenticationFactory.getLoggedInUserId();

                        if (userId) {                                
                            return $q.reject({
                                authenticated: true
                            });
                        } else {
                            return $q.resolve();
                        }
                    }]
                }
            })            
            .otherwise({
                redirectTo: '/home'
            });
        $locationProvider.html5Mode(true);
    }

})();