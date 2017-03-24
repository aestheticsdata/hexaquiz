describe('Login', function () {
    var $rootScope,
        AuthService,
        $q,
        $componentController,
        controller,
        $state,
        $location,
        AppStateService,
        cfpLoadingBar,
        onToggleLoggedOutBtn_spy,
        onUserNameAvailable_spy,
        onLaunchTimer_spy;

    beforeEach(module('hexaquiz'));

    beforeEach(inject(function ($injector) {
        $state      = $injector.get('$state');
        $location   = $injector.get('$location');
        $rootScope  = $injector.get('$rootScope');
        $q          = $injector.get('$q');

        AuthService = $injector.get('AuthService');

        onToggleLoggedOutBtn_spy = jasmine.createSpy('onToggleLoggedOutBtn');
        onUserNameAvailable_spy = jasmine.createSpy('onUserNameAvailable');
        onLaunchTimer_spy = jasmine.createSpy('onLaunchTimer');

        $componentController = $injector.get('$componentController');
        controller = $componentController('login',
            { $scope: {}, AuthService: AuthService },
            {
                onToggleLoggedOutBtn : onToggleLoggedOutBtn_spy,
                onUserNameAvailable  : onUserNameAvailable_spy,
                onLaunchTimer        : onLaunchTimer_spy
            }
        );
        controller.$onInit();

        spyOn($state, 'go'); // strange bug : if this line is commented, there is the following error message : 'TypeError: $firebaseObject(...).$loaded is not a function , comming from questions service it seems
    }));

    describe('Routes', function () {

        function goTo(url) {
            $location.url(url);
            $rootScope.$digest();
        }

        it('should go to login state', function() {
            goTo('/login');
            expect($state.current.name).toEqual('login');
        });
    });

    describe('Controller', function () {
        var promise,
            mockUser = {email: 'joe@cool.com', password: 'snoopy'},
            mockEvent = {$event:{user: mockUser}};

        beforeEach(inject(function ($injector) {
            AppStateService = $injector.get('AppStateService');
            cfpLoadingBar   = $injector.get('cfpLoadingBar');
        }));

        describe('on login success', function () {

            beforeEach(function () {
                spyOn(AuthService, 'login').and.callFake(function () {
                    return $q.when({});
                });
            });

            it('should have a text.signin property', function () {
                expect(controller.text.signin).toBeDefined();
            });

            it('should have a text.reset property', function () {
                expect(controller.text.reset).toBeDefined();
            });

            it('cfpLoadingBar should be complete()', function () {
                spyOn(cfpLoadingBar, 'complete');
                promise = controller.loginUser(mockEvent);
                promise.then(function () {
                    expect(cfpLoadingBar.complete).toHaveBeenCalled();
                });
                $rootScope.$digest();
            });

            it('should call AuthService.login on loginUser()', function () {
                promise = controller.loginUser(mockEvent);
                promise.then(function () {
                    expect(AuthService.login).toHaveBeenCalledWith(mockEvent.user);
                });
                $rootScope.$digest();
            });

            it('$state.go should have been called with "app"', function () {
                promise = controller.loginUser(mockEvent);
                promise.then(function () {
                    expect($state.go).toHaveBeenCalledWith('app');
                });
                $rootScope.$digest();
            });

            it('onToggleLoggedOutBtn should have been called when logged in with the correct payload', function () {
                var payload = { $event: {
                    loggedIn: true
                }};
                promise = controller.loginUser(mockEvent);
                promise.then(function () {
                    expect(onToggleLoggedOutBtn_spy).toHaveBeenCalledWith(payload);
                });
                $rootScope.$digest();
            });

            it('onUserNameAvailable should have been called when logged in with the correct payload', function () {
                spyOn(AuthService, 'getUser').and.callFake(function () {
                    return mockUser;
                });
                var payload = {
                    $event: {
                        user: mockUser
                    }
                };
                promise = controller.loginUser(mockEvent);
                promise.then(function () {
                    expect(onUserNameAvailable_spy).toHaveBeenCalledWith(payload);
                });
                $rootScope.$digest();
            });

            it('onLaunchTimer should have been called when logged in with the correct payload', function () {
                var payload = {
                    $event: {
                        showTimer: true
                    }
                };
                promise = controller.loginUser(mockEvent);
                promise.then(function () {
                    expect(onLaunchTimer_spy).toHaveBeenCalledWith(payload);
                });
                $rootScope.$digest();
            });

            it('$AppStateService.comingFromLogin should be true', function () {
                spyOn(AppStateService, 'comingFromLogin');

                promise = controller.loginUser(mockEvent);
                promise.then(function () {
                    expect(AppStateService.comingFromLogin).toEqual(true);
                });
                $rootScope.$digest();
            });
        });

        describe('on login error', function () {
            it('should raise an error on failed login', function () {
                var mockErrorMessage = 'wrong username or password';

                spyOn(AuthService, 'login').and.callFake(function () {
                    return $q.reject({message: mockErrorMessage});
                });

                promise = controller.loginUser({});
                promise.then(function (result) {
                    expect(controller.errorMessage).toEqual(mockErrorMessage);
                });

                $rootScope.$digest();
            });
        });
    });
});