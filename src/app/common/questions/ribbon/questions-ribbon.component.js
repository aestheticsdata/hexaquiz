var questionsRibbon = {
    bindings:{
        indexes:'<'
    },
    templateUrl:'./questions-ribbon.html',
    controller:'QuestionsRibbonController'
};

angular
    .module('hexaquiz.common.questions')
    .component('questionsRibbon', questionsRibbon);

