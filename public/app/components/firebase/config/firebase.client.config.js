/**
 * Created by nitsan on 19/02/2016.
 */
(function () {
    'use strict';

    angular
        .module('meetFireBase', ["firebase"])
        .constant("fireBaseConfig", {baseUrl: 'https://meet-irma.firebaseio.com'})
        .config(function () {
            var config = {
                apiKey: "AIzaSyDA-c4SNtsBaaf_yj6r_16Ixbfwf-exJ4o",
                authDomain: "meet-irma.firebaseapp.com",
                databaseURL: "https://meet-irma.firebaseio.com",
                storageBucket: "meet-irma.appspot.com"
            };
            firebase.initializeApp(config);
        });
})();