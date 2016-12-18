"use strict";

let mongoose = require('mongoose');
let CounterSchema = mongoose.Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 0}
});
let counters = mongoose.model('counters', CounterSchema);

function getNextSequence(name) {
    return new Promise((resolve, reject) => {
        counters.findByIdAndUpdate({_id: name}, {$inc: {seq: 1}}, (error, counter)=> {
            if (error) {
                reject(error);
            } else {
                resolve(counter.seq);
            }
        });
    });
}

module.exports.getNextSequence = getNextSequence;