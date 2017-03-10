function FakeService() {
    console.log('into fake service');

    var fs = {

    };

    return fs;
}

angular
    .module('fake',[])
    .factory('FakeService', FakeService);