"use strict";

let router = require('express').Router(),
    passport = require('passport');


router.get('/user', function (req, res) {
    res.send(req.user);
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local-login', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.status(500).json({
                    err: 'Could not log in user'
                });
            }
            res.json(user);
        });
    })(req, res, next);
});

// router.post('/signup', passport.authenticate('local-signup', {
//     successRedirect : '/profile', // redirect to the secure profile section
//     failureRedirect : '/signup', // redirect back to the signup page if there is an error
//     failureFlash : true // allow flash messages
// }));

// =====================================
// LOGOUT ==============================
// =====================================
router.get('/logout', function (req, res) {
    req.logout();
    res.send();
});

module.exports = router;