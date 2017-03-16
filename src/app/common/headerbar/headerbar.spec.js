describe('HeaderBarController', function () {
    var $componentController,
        controller,
        AuthService,
        onToggleLoggedOutBtnSpy,
        $rootScope,
        $q;

    beforeEach(function () {
        module('hexaquiz');
    });


    beforeEach(function () {
        inject(function ($injector) {
            $componentController = $injector.get('$componentController');
            AuthService = $injector.get('AuthService');
            $rootScope = $injector.get('$rootScope');
            $q = $injector.get('$q');
        });

        onToggleLoggedOutBtnSpy = jasmine.createSpy('onToggleLoggedOutBtn');

        controller = $componentController('headerBar',
            null,
            {onToggleLoggedOutBtn: onToggleLoggedOutBtnSpy}
        );

    });

    it('AuthService should have a logout method', function () {
        expect(AuthService.logout).toBeDefined();
    });

    it('headerbar controller logout should be defined', function () {
        expect(controller.logout).toBeDefined();
    });

    it('should call onToggleLoggedOutBtn when logged out', function () {
        spyOn(AuthService, 'logout').and.callFake(function () {
            var deferred = $q.defer();
            deferred.resolve();
            return deferred.promise;
        });

        controller.logout();
        $rootScope.$digest();

        expect(AuthService.logout).toHaveBeenCalled();
        expect(onToggleLoggedOutBtnSpy).toHaveBeenCalled();
    });
});