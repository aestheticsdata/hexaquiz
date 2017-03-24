describe('Questions', function () {
    var qs,
        questions = [
            {choices:['blue', 'red', 'green'], correctAnswer:2, question:"what is it ?"},
            {choices:['yes', 'no'], correctAnswer:0, question:"is it cool ?"},
            {choices:['cheddar', 'gouda'], correctAnswer:0, question:"english cheese ?"}
        ];

    // beforeEach(module('firebase')); // use firebase.mock.js
    beforeEach(module('hexaquiz'));

    beforeEach(inject(function ($injector) {
        qs = $injector.get('QuestionsService');
    }));

    beforeEach(function () {
        spyOn(qs, 'setQuestions').and.callFake(function () {
            qs.questions = questions;
        });
    });


    describe('Service', function () {
        it('question service should exist', function () {
            expect(qs).toBeDefined();
        });

        it('initCurrentAnswers() should exist', function () {
            expect(qs.initCurrentAnswers).toBeDefined();
        });
        it('initCurrentAnswers() should empty the currentAnswers array', function () {
            expect(qs.currentAnswers.length).toEqual(0);
        });

        it('retrieveQuestions() should exist', function () {
            expect(qs.retrieveQuestions).toBeDefined();
        });

        it('setQuestions() should exist', function () {
            expect(qs.setQuestions).toBeDefined();
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

        it('currentAnswers should be init to -1 in initCurrentAnswers()', function () {
            qs.setQuestions();
            qs.initCurrentAnswers();
            expect(qs.currentAnswers).toEqual([-1,-1,-1]);
        });
    });

    describe('Controller', function () {
        var $componentController,
            controller,
            transitionAliasMock = {
                params : function () {
                    return {idx:angular.noop}
                }
            };

        beforeEach(inject(function ($injector) {
            $componentController = $injector.get('$componentController');
            controller = $componentController('questions',
                null,
                {questions:[], transitionAlias:transitionAliasMock}
            );
            controller.$onInit();
        }));

        it('should have a currentIndex property', function () {
            console.log(controller);
            expect(controller.currentIndex).toBeDefined();
        });
    })
});