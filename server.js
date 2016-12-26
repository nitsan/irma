var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
const fs = require("fs");

if (fs.existsSync('./server/config/config-vars.js')) {
    require('./server/config/config-vars.js');
}

var configDB = require('./server/config/database.js');

// configuration ===============================================================
//process.env.MONGO_USER MONGO_PASSWORD MONGO_URL
console.log("MONGO_URL: " + process.env.MONGO_URL);
mongoose.Promise = global.Promise;
mongoose.connect(configDB.url);
require('./server/modules/auto-increment/counters.server.model.js');

// set up our express application
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    // using store session on MongoDB using express-session + connect
    store: new MongoStore({
        url: configDB.url,
        collection: 'sessions'
    })
}));
// Passport
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./server/config/passport')(passport);

//controllers
app.use(require('./server/modules/users/user.server.controller.js'));
app.use(require('./server/modules/core/core.server.controller.js'));
app.use(require('./server/modules/candidates/candidate.server.controller.js'));
app.use(require('./server/modules/interviewer/interviewer.server.controller'));
app.use(require('./server/modules/sms/sms.server.contoller.js'));
app.use(require('./server/modules/candidate-landing-page/candidate-landing-page.server.controller.js'));

app.listen(port);
console.log('The magic happens on port ' + port);