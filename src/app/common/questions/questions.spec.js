describe('Questions', function () {
    var qs,
        questions =  {
            'a': {choices:['blue', 'red', 'green'], correctAnswer:2, question:"what is it ?"},
            'b': {choices:['yes', 'no'], correctAnswer:0, question:"is it cool ?"},
            'c': {choices:['cheddar', 'gouda'], correctAnswer:0, question:"english cheese ?"},
            'd': {choices:['cheddar', 'gouda'], correctAnswer:0, question:"english cheese ?"}
        },
        data = {
            questions: questions
        },
        controllerCurrentIndex = 2;


    // beforeEach(module('firebase')); // use firebase.mock.js
    beforeEach(module('hexaquiz'));

    beforeEach(inject(function ($injector) {
        qs = $injector.get('QuestionsService');
    }));

    beforeEach(function () {
        spyOn(qs, 'setQuestions').and.callThrough();
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
            var currentAnswersMock = (function () {
                var arr = [];
                for (var i=0, l=(R.values(data.questions)).length; i<l; i++) {
                    arr.push(-1);
                }
                return arr;
            })();
            qs.setQuestions(data);
            expect(qs.currentAnswers).toEqual(currentAnswersMock);
        });
    });

    describe('Controller', function () {
        var $componentController,
            controller,
            $state,
            $location,
            $rootScope,
            transitionAliasMock = {
                params : function () {
                    return {idx:controllerCurrentIndex}; // -1 match currentIndex in controller
                }
            };

        function goTo(url) {
            $location.url(url);
            $rootScope.$digest();
        }

        beforeEach(inject(function ($injector) {
            $state = $injector.get('$state');
            $location = $injector.get('$location');
            $rootScope = $injector.get('$rootScope');
            $componentController = $injector.get('$componentController');
            controller = $componentController('questions',
                null ,
                {questions:[], transitionAlias:transitionAliasMock, questions:R.values(data.questions)} // R.values comes from Ramda.js lib
            );
            controller.$onInit();
        }));

        it('should have a currentIndex property', function () {
            expect(controller.currentIndex).toBeDefined();
        });

        it('should go to the next question calling navTo with "next"', function () {
            var payload = {
                idx:parseInt(controllerCurrentIndex)+1
            };


            qs.setQuestions(data);
            spyOn($state, 'go');
            controller.navTo({dir:'next'});
            $rootScope.$digest();

            expect($state.go).toHaveBeenCalledWith('questions', payload);
        });

        it('should go to the previous question calling navTo with "prev"', function () {
            var payload = {
                idx:parseInt(controllerCurrentIndex)-1
            };

            qs.setQuestions(data);
            spyOn($state, 'go');
            controller.navTo({dir:'prev'});
            $rootScope.$digest();

            expect($state.go).toHaveBeenCalledWith('questions', payload);
        });
    });
});