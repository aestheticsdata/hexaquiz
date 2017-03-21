describe('Login', function () {
    var $rootScope,
        AuthService,
        $q,
        $componentController,
        controller;

    beforeEach(module('hexaquiz'));

    beforeEach(inject(function ($injector) {
        $state      = $injector.get('$state');
        $location   = $injector.get('$location');
        $rootScope  = $injector.get('$rootScope');
        $q          = $injector.get('$q');

        AuthService = $injector.get('AuthService');
        $componentController = $injector.get('$componentController');
        controller = $componentController('login',
            { $scope: {}, AuthService: AuthService });
        controller.$onInit();
    }));

    // describe('Routes', function () {
    //     var $state, $location, $rootScope;
    //
    //     function goTo(url) {
    //         $location.url(url);
    //         $rootScope.$digest();
    //     }
    //
    //
    //
    //     // it('should redirect to auth.login state', function() {
    //     //     goTo('/auth');
    //     //     expect($state.current.name).toEqual('auth.login');
    //     // });
    //
    //     it('should go to login state', function() {
    //         goTo('/login');
    //         expect($state.current.name).toEqual('login');
    //     });
    // });

    describe('Controller', function () {

        it('should call AuthService.login on loginUser()', function () {
            var promise,
                mockUser = {email: 'joe@cool.com', password: 'snoopy'},
                mockEvent = {$event:{user: mockUser}};

            // spyOn(controller, 'loginUser');
            spyOn(AuthService, 'login').and.callFake(function () {
                return $q.when({});
            });

            promise = controller.loginUser(mockEvent);
            promise.then(function () {
                expect(AuthService.login).toHaveBeenCalledWith(mockEvent.user);
            });

        });
    });
});