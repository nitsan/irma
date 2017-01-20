/**
 * Created by Nitsan on 19/07/2016.
 */
'use strict';

angular.module('user')
    .factory('userService', userService);

/* @ngInject */
function userService($http) {
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
        return new Promise((resolve, reject) => {
            if (currentUser.userId) {
                resolve(getCurrentUser());
            } else {
                $http.get('/user')
                    .then(response => {
                        let user = response.data;
                        angular.copy(user, currentUser);
                        resolve(currentUser);
                    })
                    .catch(err => {
                        reject(err);
                    })

            }
        });
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