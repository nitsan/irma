/**
 * Created by Nitsan on 18/12/2016.
 */
"use strict";

let http = require('http'),
    logger = require('winston');

exports.sendSms = function sendSms(phoneNumber, text) {
    return new Promise((resolve) => {
        logger.info(`Going to send sms to ${phoneNumber}, with text: ${text}`);

        let options = {
            host: process.env.SMS_HOST,
            path: `/http/sendmsg?api_id=${process.env.SMS_API_ID}&user=${process.env.SMS_USER}&password=${process.env.SMS_PASSWORD}&to=${phoneNumber}&text=${text.replace(/ /g, "%20").replace(/#/g, "%23")}&from=${process.env.SMS_FROM}`
        };

        logger.debug("full path: " + options.host + options.path);

        //Set up the request
        http.get(options, function (res) {
            console.log('STATUS: ' + res.statusCode);
            console.log('HEADERS: ' + JSON.stringify(res.headers));
            resolve();
        });
    });
};