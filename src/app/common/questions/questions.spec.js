describe('Questions', function () {
    var qs, firebase;

    beforeEach(module('firebase')); // use firebase.mock.js
    beforeEach(module('hexaquiz'));

    beforeEach(inject(function ($injector) {
        qs = $injector.get('QuestionsService');
        firebase = $injector.get('$firebaseObject');
    }));

    describe('Service', function () {
        it('question service should exist', function () {
            expect(qs).toBeDefined();
        });

        it('initCurrentAnswers() should exist', function () {
            expect('qs.initCurrentAnswers').toBeDefined();
        });
        it('retrieveQuestions() should exist', function () {
            expect('qs.retrieveQuestions').toBeDefined();
        });
        it('setQuestions() should exist', function () {
            expect('qs.setQuestions').toBeDefined();
        });
        it('getQuestions() should exist', function () {
            expect('qs.getQuestions').toBeDefined();
        });

        it('has a questions array', function () {
            var questions = [];
            expect(qs.questions).toEqual(jasmine.arrayContaining(questions));
        });
        it('has a currentAnswers array', function () {
            var currentAnswers = [];
            expect(qs.currentAnswers).toEqual(jasmine.arrayContaining(currentAnswers));
        });

        it('has a firebase ref to the database', function () {
            expect(qs.ref).not.toBeNull();
        });
    })
});