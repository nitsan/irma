/**
 * Created by Nitsan on 19/12/2016.
 */
let mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let interviewerSchema = new Schema({
    interviewerId: {
        type: String,
        required: true
    },
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
    title: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    team: String,
    img: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: Date
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

interviewerSchema.virtual('displayName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

let interviewersModel = mongoose.model('Interviewers', interviewerSchema);

module.exports = interviewersModel;