/**
 * Created by Nitsan on 18/12/2016.
 */

// route middleware to make sure a user is logged in
exports.isLoggedIn = function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    // res.redirect('/');
    res.status(401).send({err: "Unauthorized"});
};
