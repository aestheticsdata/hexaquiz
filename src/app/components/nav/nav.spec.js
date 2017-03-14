describe('Nav component', function () {
    var $componentController,
        controller,
        mockNavClick = angular.noop;

    beforeEach(function () {
        module('hexaquiz');

        inject(function ($injector) {
            $componentController = $injector.get('$componentController');
            controller = $componentController('nav',
                null,
                {onNavClick: mockNavClick}
            );
            controller.$onInit();
        });
        spyOn(controller, 'onNavClick');
    });

    describe('Nav controller', function () {
        it('should have a prev method', function () {
            expect(controller.prev).toBeDefined();
        });

        it('should have a next method', function () {
            expect(controller.next).toBeDefined();
        });

        it('should call onNavClick with "prev" args', function () {
            controller.prev();

            expect(controller.onNavClick).toHaveBeenCalledWith({$event:{dir:'prev'}});
        });

        it('should call onNavClick with "next" args', function () {
            controller.next();

            expect(controller.onNavClick).toHaveBeenCalledWith({$event:{dir:'next'}});
        });
    });
});