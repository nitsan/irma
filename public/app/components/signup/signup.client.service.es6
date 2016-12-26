angular.module('signup')
    .factory('signUpService', signUpService);

function signUpService($http) {

    let service = {
        signUpUser: signUpUser
    };

    return service;

    function signUpUser(user) {
        return $http.post('/signup', user);
    }
}