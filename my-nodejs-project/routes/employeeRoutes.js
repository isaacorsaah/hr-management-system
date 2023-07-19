// employeeRoutes.js
const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');

router.get('/', async (req, res) => {
    try {
      const employees = await Employee.find({});
      res.json({ data: employees });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: 'Server error' });
    }
  });

router.post('/addEmployee', async (req, res) => {
    const newEmployee = new Employee(req.body);
    try {
      await newEmployee.save();
      res.status(200).json(newEmployee);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding employee' });
    }
  });

router.put('/editEmployee/:id', async (req, res) => {
    try {
        const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!updatedEmployee) {
            return res.status(404).json({ msg: 'Employee not found' });
        }
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
        res.status(200).json({ msg: 'Employee deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server error', error: error.message });
    }
});

router.get('/getEmployees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.json({ data: employees });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;