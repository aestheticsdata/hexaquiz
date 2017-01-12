angular
    .module('hexaquiz')
    .factory('TextService', TextService);

function TextService() {

    var text = {
        login : {
            signin : 'Sign in',
            reset  : 'Reset'
        }
    };

    return text;
}