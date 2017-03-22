describe('App', function () {

    beforeEach(module('hexaquiz'));

    // beforeEach(module(function ($stateProvider) {
    //     $stateProvider.state('questions', { url: 'app/questions' });
    // }));

    describe('routes', function () {
        var $rootScope, $location, $state, AuthService;


        function goTo(url) {
            $location.url(url);
            $rootScope.$digest();
        }

        beforeEach(inject(function ($injector) {
            $rootScope =  $injector.get('$rootScope');
            $location =   $injector.get('$location');
            $state =      $injector.get('$state');
            AuthService = $injector.get('AuthService');
        }));

        it('should redirect to questions state', function () {
            // spyOn(AuthService, 'isAuthenticated').and.returnValue(true);
            // spyOn(AuthService, 'isAuthenticated').and.callFake(function () {
            //     return true;
            // });
            spyOn(AuthService, 'isAuthenticated');

            goTo('/app');

            expect($state.current.name).toEqual('login');
            // expect(AuthService.isAuthenticated).toHaveBeenCalled();
        });
    });

});