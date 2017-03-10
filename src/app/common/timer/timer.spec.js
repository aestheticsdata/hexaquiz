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

});