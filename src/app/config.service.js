function config($log, hlg) {
    var config = {
        TIMER_COUNT: 25
    };

    return config;
}



angular
    .module('hexaquiz')
    .factory('GLOBAL_CONFIG', config);