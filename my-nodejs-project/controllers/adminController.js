const Admin = require('../models/admin.model');
const Employee = require('../models/employee.model');

exports.createAdmin = (req, res) => {
  const newAdmin = new Admin(req.body);
  newAdmin.save((err, admin) => {
    if (err) {
      res.status(500).send({ message: 'An error occurred while creating the admin' });
    } else {
      res.status(200).send(admin);
    }
  });
};
exports.getAllAdmins = (req, res) => {
  Admin.find({}, (err, admins) => {
    if (err) {
      res.status(500).send({ message: 'An error occurred while retrieving admins' });
    } else {
      res.status(200).send(admins);
    }
  });
};