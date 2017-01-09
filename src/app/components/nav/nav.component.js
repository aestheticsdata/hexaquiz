var nav = {
    bindings: {
        questions:'<',
        isPrevDisabled:'<',
        onNavClick:'&'
    },
    templateUrl: './nav.html',
    controller: 'QuestionsNavController'
};

angular
    .module('hexaquiz.components.nav')
    .component('nav', nav);