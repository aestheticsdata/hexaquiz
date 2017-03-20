describe('Login', function () {
    beforeEach(module('hexaquiz'));

    describe('Routes', function () {
        var $state, $location, $rootScope;

        function goTo(url) {
            $location.url(url);
            $rootScope.$digest();
        }

        beforeEach(inject(function ($injector) {
            $state = $injector.get('$state');
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
        }));

        // it('should redirect to auth.login state', function() {
        //     goTo('/auth');
        //     expect($state.current.name).toEqual('auth.login');
        // });

        it('should go to login state', function() {
            goTo('/login');
            expect($state.current.name).toEqual('login');
        });
    });

    describe('Controller', function () {
        var $componentController, controller;

        beforeEach(inject(function ($injector) {
            $componentController = $injector.get('$componentController');
            controller = $componentController('login', null);
            controller.$onInit();
        }));

        it('should call AuthService.login on loginUser()', function () {
            spyOn(controller, 'loginUser');
        });
    });
});