const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Route to get employee details
router.get('/details', authMiddleware.verifyToken, employeeController.getEmployeeDetails);

// Route to update employee details
router.put('/details', authMiddleware.verifyToken, employeeController.updateEmployeeDetails);
router.post('/employees', employeeController.createEmployee);
router.get('/employees', employeeController.getAllEmployees);
module.exports = router;