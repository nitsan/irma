/**
 * Created by nitsa on 30/01/2017.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let meetingsSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    candidateId: {
        type: String,
        required: true
    },
    meetingId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    archived: {
        type: Boolean,
        required: true,
        default: false
    },
    interviewers: Array,
    summaries: {
        type:[{
            interviewerId: String,
            summary: String
        }]
    },
    createDate: Date,
    updateDate: Date
});

let meetingsModel = mongoose.model('Meetings', meetingsSchema);

module.exports = meetingsModel;