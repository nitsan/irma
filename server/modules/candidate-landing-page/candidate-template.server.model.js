/**
 * Created by Nitsan on 26/12/2016.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const candidateLandingPageConfig = require('./candidate-landing-page.server.config');

const candidateTemplateSchema = new Schema({
    template: {
        type: String,
        required: true,
        default: candidateLandingPageConfig.TEMPLATE_DEFAULT.template
    },
    userId: {
        type: String,
        required: true
    },
    address: {
        address: {
            type: String,
            default: ''
        },
        waze: String,
        google: String
    },
    createDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    updateDate: {
        type: Date,
        required: true,
        default: Date.now
    },
});

let candidateTemplateModel = mongoose.model('candidateTemplates', candidateTemplateSchema);

module.exports = candidateTemplateModel;
