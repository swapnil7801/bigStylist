describe('Controller: HomeController', function() {

    var HomeService, 
        deferred,
        HomeController,
        scope, 
        rootScope;

    beforeEach(function() {
        module('angularApp');
    });

    beforeEach(inject(function($rootScope, $controller, $q) {
        rootScope = $rootScope;
        scope = $rootScope.$new();

        HomeService = {
            getHomePageData: function() {
                deferred = $q.defer();
                deferred.resolve({
                    'content': "Welcome to home page"
                });
                return deferred.promise;
            }
        };

        HomeController = $controller('HomeController', {
            $scope: scope,
            HomeService: HomeService
        });
    }));

    describe('State', function() {

        it('should call getHomePageData on mockHomeService', function() {

            spyOn(HomeService, 'getHomePageData').and.callThrough();

            HomeController.loadHomePageData();

            scope.$root.$digest();
            expect(HomeService.getHomePageData).toHaveBeenCalled();
            expect(HomeService.getHomePageData.calls.count()).toBe(1);
            expect(HomeController.content).toBeDefined();
            expect(HomeController.content).toBe("Welcome to home page");
        });

    });
});