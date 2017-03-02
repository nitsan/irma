/**
 * Created by Nitsan on 19/07/2016.
 */
'use strict';

angular.module('user')
    .factory('userService', userService);

/* @ngInject */
function userService($http, $q) {
    var currentUser = {};

    var service = {
        login: login,
        logout: logout,
        getUser: getUser,
        getCurrentUser: getCurrentUser
    };

    return service;

    ////////////

    function login(user) {
        return $http.post('/login', user)
            .then(function (response) {
                angular.copy(response.data, currentUser);
                return currentUser;
            })
            .catch(function (response) {
                console.error("Cannot login: " + response.data);
                return null;
            });
    }

    function getUser() {
        let deferred = $q.defer();

        if (currentUser.userId) {
            deferred.resolve(getCurrentUser());
        } else {
            $http.get('/user')
                .then(response => {
                    let user = response.data;
                    angular.copy(user, currentUser);
                    deferred.resolve(currentUser);
                })
                .catch(err => {
                    deferred.reject(err);
                })

        }

        return deferred.promise;
    }

    function getCurrentUser() {
        return currentUser;
    }

    // function isCurrentUser() {
    //     return Object.keys(currentUser).length > 0;
    // }

    function logout() {
        angular.copy({}, currentUser);
        return $http.get('/logout');
    }
}