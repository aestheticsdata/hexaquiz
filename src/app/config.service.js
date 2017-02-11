function config($log, hlg) {
    var config = {
        TIMER_COUNT: 25 // number of seconds
    };

    return config;
}



angular
    .module('hexaquiz')
    .factory('GLOBAL_CONFIG', config);