describe('Root component', function () {

    var $componentController, controller, timerService;

    beforeEach(function () {
        module('firebase');
        module('hexaquiz');
    });


    describe('RootController', function () {

        beforeEach(function () {
            inject(function ($injector) {
                timerService = $injector.get('TimerService');
                $componentController = $injector.get('$componentController');
                controller = $componentController('rootcomponent', null );
                controller.$onInit();
            });
        });

        it('should have a username variable', function () {
            expect(controller.userName).toBeDefined();
        });

        it('displayUserName should have been called', function () {
            spyOn(timerService, 'initCounter');
            controller.displayLogOutButton({loggedIn:false});
            expect(timerService.initCounter).toHaveBeenCalled();
        });

    });

    describe('RootController', function () {

        it('loggedIn should be false', function () {
            expect(controller.loggedIn).toBe(false);
        });

    });


});