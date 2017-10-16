angular.module('signup')
    .factory('signUpService', signUpService);

signUpService.$inject= ['$http'];

function signUpService($http) {

    let service = {
        signUpUser: signUpUser
    };

    return service;

    function signUpUser(user) {
        return $http.post('/signup', user);
    }
}