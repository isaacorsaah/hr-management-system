const Employee = require('../models/employee.model');

exports.createEmployee = (req, res) => {
  const newEmployee = new Employee(req.body);
  newEmployee.save((err, employee) => {
    if (err) {
      res.status(500).send({ message: 'An error occurred while creating the employee' });
    } else {
      res.status(200).send(employee);
    }
  });
};
exports.getAllEmployees = (req, res) => {
  Employee.find({}, (err, employees) => {
    if (err) {
      res.status(500).send({ message: 'An error occurred while retrieving employees' });
    } else {
      res.status(200).send(employees);
    }
  });
};