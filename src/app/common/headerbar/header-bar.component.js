var headerbar = {
    templateUrl: './header-bar.html',
    controller: 'HeaderBarController',
    bindings: {
        loggedIn: '<'
    }
};

angular
    .module('hexaquiz.common')
    .component('headerBar', headerbar);