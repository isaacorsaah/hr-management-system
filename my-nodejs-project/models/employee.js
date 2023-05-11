const mongoose = require('mongoose');
const employeeSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  position: { type: String, required: true },
  salary: { type: Number, required: true },
});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;