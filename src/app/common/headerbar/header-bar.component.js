var headerbar = {
    templateUrl: './header-bar.html',
    controller: 'HeaderBarController',
    bindings: {

    }
};

angular
    .module('hexaquiz.common')
    .component('headerBar', headerbar);