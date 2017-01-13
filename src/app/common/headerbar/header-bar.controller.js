function HeaderBarController() {
    var ctrl = this;

    ctrl.$onInit = function () {
        console.log('HeaderBarController');
        console.log('ctrl.loggedIn', ctrl.loggedIn);
    };

    ctrl.$onChanges = function (changes) {
        ctrl.loggedIn = changes.loggedIn.currentValue;
    }
}

angular
    .module('hexaquiz.common')
    .controller('HeaderBarController', HeaderBarController);