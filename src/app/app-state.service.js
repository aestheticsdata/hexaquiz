function AppStateService() {
    var state = {
        comingFromLogin: false
    };
    return state;
}

angular
    .module('hexaquiz')
    .factory('AppStateService', AppStateService);