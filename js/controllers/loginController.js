//loginController.js

angular.module('SPAquiz.controllers').controller('LoginController', LoginController);

function LoginController($scope, $state, LoginService, QuestionsService) {

    $scope.login = function () {

        var user = document.querySelector('#userfield').value,
            pass = document.querySelector('#passfield').value;


        console.log('submit form');

        LoginService.login(user, pass)
            .then(
                function onSuccess(res) {
                    console.log(res);

                    QuestionsService.setQuestions(res);

                    $state.go('quiz', {idx:0}); // go to first question
                })
            .catch(
                function onError(res) {
                    console.log(res);
                    $scope.loginerror = true;
                }
            );
    };

    $scope.onFocus = function (evt) {

        $scope.loginerror = false;
        evt.target.value = "";

    };

    $scope.loginerror = false;
}