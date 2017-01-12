var authForm = {
    bindings: {

    },
    templateUrl:'./auth-form.html',
    controller:'AuthFormController'
};

angular
    .module('hexaquiz.components.auth')
    .component('authForm', authForm);