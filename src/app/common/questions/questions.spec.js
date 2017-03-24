describe('Questions', function () {
    var qs;

    beforeEach(module('firebase')); // use firebase.mock.js
    beforeEach(module('hexaquiz'));



    beforeEach(inject(function ($injector) {
        qs = $injector.get('QuestionsService');
    }));

    it('Should exist', function () {
        expect(qs).toBeDefined();
    });

    describe('.initCurrentAnswers()', function () {
        it('should exist', function () {
            expect('qs.initCurrentAnswers').toBeDefined();
        });
    });
});