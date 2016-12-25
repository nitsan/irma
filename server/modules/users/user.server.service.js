/**
 * Created by Nitsan on 25/12/2016.
 */
'use strict';

const co = require('co'),
    logger = require('winston');

const UserModel = require('./user.server.model');


exports.getUserById = co.wrap(function*(userId) {
    let user;

    try {
        user = yield UserModel.findOne({userId: userId}).exec();
    } catch (err) {
        logger.error(`Cannot get user ${userId}, err: ${err}`);
        yield Promise.reject(err);
    }

    return user;
});
