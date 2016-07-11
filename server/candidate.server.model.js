/**
 * Created by Nitsan on 09/07/2016.
 */
var mongoose = require('mongoose');
// mongoose.connect('mongodb://todoapp:123456@ds011382.mlab.com:11382/heroku_cx39kfwg');
mongoose.connect('mongodb://nitsanzo:irma@ds035333.mlab.com:35333/mongo-irma');

console.log('Mongodb connection [OK]');

var candidatesModel = mongoose.model('Candidates', {
    userId: String,
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    id: String,
    interviewer: String,
    img: String,
    team: String,
    date: Date,
    createDate: Date,
    updateDate: Date
});

module.exports = candidatesModel;