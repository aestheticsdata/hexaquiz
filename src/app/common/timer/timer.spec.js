describe('Timer', function () {
    var ts;


    describe('Service', function () {
        beforeEach(function () {
            module('hexaquiz');
        });

        beforeEach(function () {
            inject(function ($injector) {
                ts = $injector.get('TimerService');
            });
        });


        it('TimerService Should exist', function () {
            expect(ts).toBeDefined();
        });

        it('has a count var', function () {
            expect(ts.count).toBeDefined();
        });

        it('has a tempMin var', function () {
            expect(ts.tempMin).toBeDefined();
        });

        it('has a tempSec var', function () {
            expect(ts.tempSec).toBeDefined();
        });
    });

    // describe('Controller', function () {
    //     var $interval,
    //         $componentController,
    //         controller;
    //
    //     beforeEach(inject(function ($injector) {
    //         $interval = $injector.get('$interval');
    //         $componentController = $injector.get('$componentController');
    //         controller = $componentController('timer', null);
    //         controller.$onInit();
    //     }));
    // });
});