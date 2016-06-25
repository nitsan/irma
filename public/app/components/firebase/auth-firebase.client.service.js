/**
 * Created by nitsa on 07/02/2016.
 */
angular
    .module('meetFireBase')
    .factory("AuthService", function ($firebaseAuth, fireBaseConfig) {
        var ref = new Firebase(fireBaseConfig.baseUrl);
        var authObj = $firebaseAuth(ref);
        var currentUser = null;
        //var ref = new Firebase();
        //return $firebaseAuth(ref);

        function getUser(){
            return currentUser;
        }

        function login(user) {
            currentUser = user;
            return authObj.$authWithPassword({
                email: user.email,
                password: user.password
            }, function (error, authData) {
                if (error) {
                    console.log("Login error: ", error);
                    return null;
                }

                console.log("Logged in as:", authData.uid);
                return authData;
            }, {
                remember: "sessionOnly"
            });
        }

        function requireAuth() {
            return authObj.$requireAuth();
        }

        function getUserAuth(user) {
            if (!user) {
                return authObj.$requireAuth();
            } else {
                return authObj.$authWithPassword({
                    email: user.email,
                    password: user.password
                }, function (error, authData) {
                    if (error) {
                        console.log("Login error: ", error);
                    }
                    console.log("Logged in as:", authData.uid);
                    return authData;
                }, {
                    remember: "sessionOnly"
                });
            }

            /*        .then(function(error, authData) {
             if (error) {
             console.log("Login Failed!", error);
             return error;
             } else {
             console.log("Authenticated successfully with payload:", authData);
             return authData;
             }
             });*/
        }

        function logout() {
            console.log("Bye bye, in logout!");
            return authObj.$unauth();
        }

        return {
            getUser: getUser,
            login: login,
            requireAuth: requireAuth,
            getUserAuth: getUserAuth,
            logout: logout
        }
    }
);