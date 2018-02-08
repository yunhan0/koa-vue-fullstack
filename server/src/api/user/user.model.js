'use strict';

const mongoose = require('mongoose');
const crypto = require('crypto');

var userSchema = mongoose.Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, 'email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        min: [6, 'password must be at least 6 characters']
    },
    salt: String
});
/* 
 * The User model should fully encapsulate the password encryption and verification logic, 
 * The User model should ensure that the password is always encrypted before saving
 * */
userSchema.pre('save', function(next) {
    this.salt = this.makeSalt();
    next();
});

userSchema.pre('save', function() {
    this.password = this.encryptPassword(this.password);
});

userSchema.methods = {
    makeSalt(defaultLength = 16) {
        return crypto.randomBytes(Math.ceil(defaultLength/2))
            .toString('hex') // convert to hexadecimal format
            .slice(0, defaultLength); // return required number of characters
    },

    encryptPassword(password) {
        /** Hashing algorithm sha512 */
        let hash = crypto.createHmac('sha512', this.salt);
        hash.update(password);
        return hash.digest('hex');
    }
}

// Compiling our schema into a Model.
module.exports = mongoose.model('User', userSchema);