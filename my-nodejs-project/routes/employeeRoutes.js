// employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt');
const User = require('../models/User');

router.get('/', async (req, res) => {
    try {
      const employees = await Employee.find({});
      res.json({ data: employees });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
});

router.put('/editEmployee/:id', async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEmployee) {
        return res.status(404).json({ msg: 'Employee not found' });
      }
      const {username, email, password} = updatedEmployee;
      const existingUser = await User.findOne({ "email": email });

      if (existingUser) {
          existingUser.username = username;
          if(password) {
              const salt = await bcrypt.genSalt(10);
              const hashedPassword = await bcrypt.hash(password, salt);
              existingUser.password = hashedPassword;
          }
          await existingUser.save();
      } else {}
      res.status(200).json({ msg: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error', error: error.message });
    }
  });  

router.delete('/deleteEmployee/:id', async (req, res) => {
    try {
        const removedEmployee = await Employee.findByIdAndRemove(req.params.id);
        if (!removedEmployee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }
        const removedUser = await User.findOneAndRemove({ email: removedEmployee.email });
        if (!removedUser) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

router.get('/getEmployees', async (req, res) => {
  try {
      const employees = await Employee.find({}).populate('user');
      res.json({ data: employees });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.post('/addEmployee', async (req, res) => {
  try {
      console.log(req.body);
      const {username, email, password, job, hours, employeeId, contact} = req.body;
      const existingEmployee = await Employee.findOne({ "email": email });
      if (existingEmployee) {
          return res.status(400).json({ msg: 'Employee already exists' });
      }

      const existingUser = await User.findOne({ "email": email });
      if (existingUser) {
          return res.status(400).json({ msg: 'User already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new User({username, email, password: hashedPassword, role: 'Employee'});
      await user.save();

      const employee = new Employee({username, email, password, job, hours, employeeId, contact});
      await employee.save();

      res.status(200).json({ msg: 'Employee created successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error', error: error.message });
  }
});

module.exports = router;