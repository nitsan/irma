/**
 * Created by Nitsan on 09/07/2016.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

console.log('Mongodb connection [OK]');

let candidateSchema = new Schema({
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
    interviewerIds: Array,
    img: String,
    team: String,
    date: Date,
    createDate: Date,
    updateDate: Date
});

let candidatesModel = mongoose.model('Candidates', candidateSchema);

module.exports = candidatesModel;