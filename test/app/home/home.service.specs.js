describe('Service: HomeService', function() {

  beforeEach(module('angularApp'));

  var myService;
  var httpBackend;
  beforeEach(inject(function($httpBackend, _myService_) {
    httpBackend = $httpBackend;
    myService = _myService_;
  }));

});