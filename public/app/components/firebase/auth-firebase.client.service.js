/**
 * Created by nitsan on 07/02/2016.
 */
angular
    .module('meetFireBase')
    .factory("AuthService", function ($firebaseAuth) {
            var authObj = $firebaseAuth();
            var currentUser = null;

            function getUser() {
                return currentUser;
            }

            function login(user) {
                // remember: "sessionOnly" ??
                return authObj.$signInWithEmailAndPassword(user.email, user.password)
                    .then(function (firebaseUser) {
                        console.info("Logged in as:", firebaseUser.uid);
                        currentUser = user;
                        return firebaseUser;
                    })
                    .catch(function (error) {
                        console.warn("Login error: ", error);
                        return null;
                    });
            }

            function logout() {
                console.log("Bye bye, in logout!");
                return authObj.$signOut();
            }

            return {
                getUser: getUser,
                login: login,
                logout: logout
            }
        }
    );