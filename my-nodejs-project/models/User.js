// User.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum : ['Admin','Employee'], 
        default: 'Employee'
    }
});

// UserSchema.pre('save', async function(next) {
//     const user = this;
//     if(user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8);
//     }
//     next();
// });
UserSchema.methods.generateAuthToken = async function() {
    const user = this;
    const token = jwt.sign({_id: user._id, role: user.role}, jwtSecretKey);
    return token;
}

module.exports = mongoose.model('User', UserSchema);