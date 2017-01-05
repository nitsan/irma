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
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
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
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

candidateSchema.virtual('displayName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

let candidatesModel = mongoose.model('Candidates', candidateSchema);

module.exports = candidatesModel;