function HeaderBarController() {
    var ctrl = this;

    ctrl.$onInit = function () {
        console.log('HeaderBarController');
    }
}

angular
    .module('hexaquiz.common')
    .controller('HeaderBarController', HeaderBarController);