// models/Employee.js
const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    contact: {
        type: String,
        required: true,
    },
    job: {
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    absences: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('Employee', EmployeeSchema);