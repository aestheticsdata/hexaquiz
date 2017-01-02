//loginService.js

angular.module('SPAquiz.services').factory('LoginService', LoginService);

function LoginService($http, CONFIG) {

    var ws = {
        login: _login
    };

    return ws;




//  ┌─┐┬─┐┬┬  ┬┌─┐┌┬┐┌─┐  ┌┬┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐
//  ├─┘├┬┘│└┐┌┘├─┤ │ ├┤   │││├┤  │ ├─┤│ │ ││└─┐
//  ┴  ┴└─┴ └┘ ┴ ┴ ┴ └─┘  ┴ ┴└─┘ ┴ ┴ ┴└─┘─┴┘└─┘

    function _login(user, pass) {

        if (CONFIG.debug) {

            return $http.get('../mock_data/questions.json')

        } else {

            return $http.post(
                    // CONFIG.loginUrl, {
                    //     username : user,
                    //     password : pass
                    // });
                    CONFIG.loginUrl_alt, {
                        username : user,
                        password : pass
                    });
        }
    }
}
