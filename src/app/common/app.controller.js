function AppController() {
    var ctrl = this;

    ctrl.$onInit = function () {
        console.log('AppController');

        // display log out button when user is logged in
        // and questions url are accessed directly
        ctrl.parentCtrl.displayLogOutButton();
    }
}

angular
    .module('hexaquiz.common')
    .controller('AppController', AppController);