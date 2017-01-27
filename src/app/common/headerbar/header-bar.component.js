var headerbar = {
    templateUrl: './header-bar.html',
    controller: 'HeaderBarController',
    bindings: {
        loggedIn: '<',
        userName: '@',
        onToggleLoggedOutBtn: '&'
    }
};

angular
    .module('hexaquiz.common')
    .component('headerBar', headerbar);