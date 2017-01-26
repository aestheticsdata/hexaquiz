var headerbar = {
    templateUrl: './header-bar.html',
    controller: 'HeaderBarController',
    bindings: {
        loggedIn: '<',
        onToggleLoggedOutBtn: '&'
    }
};

angular
    .module('hexaquiz.common')
    .component('headerBar', headerbar);