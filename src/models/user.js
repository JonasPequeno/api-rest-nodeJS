'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    pass: {
        type: String,
        required: true,
        select: false
    },
    createAt: {
        type: Date,
        default: Date.now,
    }
});

UserSchema.pre(('save', async () => {
    const hash = await bcrypt.hash(this.pass, 10);
    this.pass = hash;
    next();
}))

const User = mongoose.model('User', UserSchema);

module.exports = User;