var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var apis = require('./BE/apis.js');

var port = process.env.PORT || 3000;

app.use(express.static('app/www'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', apis);

app.listen(port);
console.log('server runs on port: ' + port);
