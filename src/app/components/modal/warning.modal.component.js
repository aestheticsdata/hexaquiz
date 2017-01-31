var warning = {
    templateUrl:'./warning.html',
    bindings: {
        message: '@',
        close: '&',
        dismiss:'&'
    },
    controller: 'WarningModalController'
};

angular
    .module('hexaquiz.components.modal')
    .component('warning', warning);