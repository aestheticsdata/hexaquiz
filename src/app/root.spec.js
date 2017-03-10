describe('Root component', function () {

    var $componentController, controller;

    beforeEach(function () {
        module('firebase');
        module('hexaquiz');
    });


    describe('RootController', function () {

        beforeEach(function () {
            inject(function ($injector) {
                $componentController = $injector.get('$componentController');
                controller = $componentController('rootcomponent', null );

            });
        });

        it('should have a username variable', function () {
            controller.$onInit();
            expect(controller.userName).toBeDefined();
        });

    });

    describe('RootController', function () {

        it('loggedIn should be false', function () {
            expect(controller.loggedIn).toBe(false);
        });

    });

});