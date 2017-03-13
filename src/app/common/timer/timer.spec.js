describe('Timer Service', function () {
    var ts;

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