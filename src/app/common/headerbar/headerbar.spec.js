describe('HeaderBarController', function () {
    var $componentController,
        controller,
        AuthService,
        onToggleLoggedOutBtnSpy,
        $rootScope,
        $q,
        $state;

    function logoutHelper() {
        controller.logout();
        $rootScope.$digest();
        expect(AuthService.logout).toHaveBeenCalled();
    }

    beforeEach(function () {
        module('hexaquiz');
    });


    beforeEach(function () {
        inject(function ($injector) {
            $componentController = $injector.get('$componentController');
            AuthService = $injector.get('AuthService');
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
            $state = $injector.get('$state');
        });

        onToggleLoggedOutBtnSpy = jasmine.createSpy('onToggleLoggedOutBtn');

        controller = $componentController('headerBar',
            null,
            {
                onToggleLoggedOutBtn: onToggleLoggedOutBtnSpy,
                loggedIn: false
            }
        );

    });

    beforeEach(function () {
        spyOn(AuthService, 'logout').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        });
    });

    it('AuthService should have a logout method', function () {
        expect(AuthService.logout).toBeDefined();
    });

    it('headerbar controller logout should be defined', function () {
        expect(controller.logout).toBeDefined();
    });

    it('should call onToggleLoggedOutBtn when logged out with the correct payload', function () {
        var payload = {$event:{loggedIn: false }};
        logoutHelper();
        expect(onToggleLoggedOutBtnSpy).toHaveBeenCalledWith(payload);
    });

    it('should go to the login state on logout', function () {
        spyOn($state, 'go').and.callThrough();
        logoutHelper();
        expect($state.go).toHaveBeenCalledWith('login');
    });

    it('should have an $onChange method', function () {
        expect(controller.$onChanges).toBeDefined();
    })
});