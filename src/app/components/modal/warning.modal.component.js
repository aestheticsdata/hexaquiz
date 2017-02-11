var warning = {
    templateUrl:'./warning.html',
    bindings: {
        // message: '@',
        close: '&',
        // dismiss:'&',
        resolve: '<'
    },
    controller: 'WarningModalController'
};

angular
    .module('hexaquiz.components.modal')
    .component('warning', warning);