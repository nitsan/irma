// app/models/user.js
// load the things we need
let mongoose = require('mongoose'),
    bcrypt = require('bcrypt-nodejs');

// define the schema for our user model
let userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    userId: String,
    title: String,
    phone: {
        mobile: {
            type: String
        },
        office: {
            type: String
        }
    },
    groupId: String,
    local: {
        email: String,
        password: String
    }
    // facebook         : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // },
    // twitter          : {
    //     id           : String,
    //     token        : String,
    //     displayName  : String,
    //     username     : String
    // },
    // google           : {
    //     id           : String,
    //     token        : String,
    //     email        : String,
    //     name         : String
    // }

});

userSchema.virtual('displayName').get(function () {
    return `${this.firstName} ${this.lastName}`;
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Users', userSchema);