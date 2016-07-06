    // function LoginController( LoginService, toastr) {

    //     this.submitForm = function(loginForm) {
    //         if(loginForm.$valid) {                
    //             LoginService.validateUserLoginDetils(this.loginField.email, this.loginField.password, function(result){
    //                 if(result.LoginStatus === true) {
    //                     toastr.success('You are valid User', {
    //                       closeButton: true
    //                     });
    //                 } else {
    //                     toastr.error('You are not a valid User', {
    //                       closeButton: true
    //                     });
    //                 }
    //             }, function(error){

    //             });
    //         }
    //     }
    // }


describe('Controller: LoginController', function() {

    var HomeService,
        form,
        LoginController,
        scope,
        rootScope;

    beforeEach(function() {
        module('angularApp', 'public/app/login/login.html');

    });

    beforeEach(inject(function($rootScope, $controller, $q, $templateCache, $compile) {
        rootScope = $rootScope;
        scope = $rootScope.$new();

        LoginController = $controller('LoginController'), {
            "$scope": scope
        }

        templateHtml = $templateCache.get('public/app/login/login.html');

        formElem = angular.element("<div>" + templateHtml + "</div>")
        $compile(formElem)(scope)
        form = scope.LoginForm;

        scope.$apply()
    }));

    describe('Login Form Fields testing', function() {

        it('should not allow invalid email and blank password', function() {
            
            expect(form.$valid).toBeFalsy();
            
            form.email.$setViewValue('');
            expect(form.email.$valid).toBeFalsy();
            form.password.$setViewValue('');
            expect(form.password.$valid).toBeFalsy();
            expect(form.$valid).toBeFalsy();
            
            form.email.$setViewValue('test');
            expect(form.email.$valid).toBeFalsy();
            expect(form.$valid).toBeFalsy();
            
            form.email.$setViewValue('test@test');
            expect(form.email.$valid).toBeFalsy();
            expect(form.$valid).toBeFalsy();
            
            form.email.$setViewValue('test@test.com');
            expect(form.email.$valid).toBeTruthy();
            form.password.$setViewValue('test123');
            expect(form.email.$valid).toBeTruthy();
            expect(form.$valid).toBeTruthy();
            
            //scope.$root.$digest();
            //LoginController.submitForm(form);

        });
    });
});
