// models/Employee.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    contact: { type: String, required: true },
    job: { type: String, required: true },
    hours: { type: Number, default: 0 },
    absences: { type: Number, default: 0 },
});

module.exports = mongoose.model('Employee', EmployeeSchema);