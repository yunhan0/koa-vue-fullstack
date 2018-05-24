'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

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
    role: {
        type: String,
        default: 'user' // Other roles so far: admin.
    }
})
/* 
 * The User model should fully encapsulate the password encryption and verification logic, 
 * The User model should ensure that the password is always encrypted before saving
 * */
userSchema.pre('save', async function encryptPassword() {
    try {
        let user = this
        if (!user.isModified('password')) {
            return
        }
        const hash = await bcrypt.hash(user.password, saltRounds)
        // Store hash in your password DB.
        user.password = hash
    } catch(err) {
        throw err
    }
})

/**
 * Check if the passwords are the same
 */
userSchema.methods.comparePassword = async function(myPlaintextPassword) {
    try {
        // Load hash from your password DB.
        let hash = this.password
        let res = await bcrypt.compare(myPlaintextPassword, hash)
        return res
    } catch(err) {
        throw err        
    }
}

// Compiling our schema into a Model.
module.exports = mongoose.model('User', userSchema)