var authForm = {
    bindings: {
        user: '<',
        errorMessage: '@',
        signButton:'@',
        resetButton: '@',
        onSubmit: '&'
    },
    templateUrl:'./auth-form.html',
    controller:'AuthFormController'
};

angular
    .module('hexaquiz.components.auth')
    .component('authForm', authForm);