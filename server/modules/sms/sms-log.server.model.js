/**
 * Created by Nitsan on 25/12/2016.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const smsLogSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    candidateId: String,
    to: Array,
    text: String,
    platform: {
        type: String,
        default: process.env.NODE_ENV
    },
    createDate: {
        type: Date,
        default: Date.now
    }
});


let smsLogModel = mongoose.model('sms-log', smsLogSchema);

module.exports = smsLogModel;
