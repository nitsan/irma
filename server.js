var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var apis = require('./server/apis.js');
var candidates = require('./server/candidate.server.js');

var port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(__dirname + '/node_modules/'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', apis);
app.use('/', candidates);

app.listen(port);
console.log('server runs on port: ' + port);
