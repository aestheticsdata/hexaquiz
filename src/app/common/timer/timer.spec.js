describe('Timer Service', function () {
    var ts, gcfg;

    beforeEach(function () {
        module('hexaquiz');
    });

    beforeEach(function () {
        inject(function ($injector) {

            console.log('1898');
            ts = $injector.get('TimerService');
            console.log(ts);
        });
    });


    it('TimerService Should exist', function () {
        expect(ts).toBeDefined();
    });

});