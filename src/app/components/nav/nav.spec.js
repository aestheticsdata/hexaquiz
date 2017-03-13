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

    it('should have a prev method', function () {
        expect(controller.prev).toBeDefined();
    });

    it('should have a next method', function () {
        expect(controller.next).toBeDefined();
    });

    it('should call onNavClick with the correct args', function () {
        controller.prev();

        expect(controller.onNavClick).toHaveBeenCalledWith({$event:{dir:'prev'}});

        controller.next();

        expect(controller.onNavClick).toHaveBeenCalledWith({$event:{dir:'next'}});
    });

});