angular
    .module('hexaquiz.components.auth', [
        'ui.router',
        'firebase'
    ])
    .config(function (CONFIG, $firebaseRefProvider) {
        var config = CONFIG();
        $firebaseRefProvider
            .registerUrl({
                default: CONFIG.databaseURL
            });

        firebase.initializeApp(CONFIG);
    });