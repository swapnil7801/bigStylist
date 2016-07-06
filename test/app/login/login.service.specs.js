describe('Service: LoginService', function() {

beforeEach(module('angularApp'));

it('should get login success',
    inject(function(LoginService, $httpBackend) {

        $httpBackend.expect('POST', 'http://localhost:8002/api/login')
            .respond(200, {LoginStatus: true, msg: 'valid user', id: 1222});

        LoginService.validateUserLoginDetils('test@test.com', 'test123')
            .then(function(data) {
                expect(data.LoginStatus).toBeTruthy();
            });

        $httpBackend.flush();
    }));

	it('should get login failed',
    inject(function(LoginService, $httpBackend) {

        $httpBackend.expect('POST', 'http://localhost:8002/api/login')
            .respond(200, {LoginStatus: false, msg: 'not valid user', id: 1222});

        LoginService.validateUserLoginDetils('abc@xyz.com', 'abc123')
            .then(function(data) {
                expect(data.LoginStatus).toBeFalsy();
            });

        $httpBackend.flush();
    }));

});



