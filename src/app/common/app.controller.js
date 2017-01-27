function AppController() {
    var ctrl = this;

    ctrl.$onInit = function () {
        console.log('AppController');
    }
}

angular
    .module('hexaquiz.common')
    .controller('AppController', AppController);