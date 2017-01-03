function AppController() {
    this.$onInit = function () {
        console.log('AppController');
    }
}

angular
    .module('hexaquiz.common')
    .controller('AppController', AppController);