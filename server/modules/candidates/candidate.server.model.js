/**
 * Created by Nitsan on 09/07/2016.
 */
const mongoose = require('mongoose');

console.log('Mongodb connection [OK]');

let candidatesModel = mongoose.model('Candidates', {
    userId: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    candidateId: {
        type: String,
        required: true
    },
    interviewer: String,
    img: String,
    team: String,
    date: Date,
    createDate: Date,
    updateDate: Date
});

module.exports = candidatesModel;