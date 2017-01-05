var questionsRibbon = {
    bindings:{
        transitionAlias:'<',
        questions:'<'
    },
    templateUrl:'./questions-ribbon.html',
    controller:'QuestionsRibbonController'
};

angular
    .module('hexaquiz.common.questions')
    .component('questionsRibbon', questionsRibbon);

