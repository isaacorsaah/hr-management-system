const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Route to get all employees
router.get('/employees', authMiddleware.verifyToken, adminController.getAllEmployees);

// Route to create a new employee
router.post('/employees', authMiddleware.verifyToken, adminController.createEmployee);

// Route to update an existing employee
router.put('/employees/:id', authMiddleware.verifyToken, adminController.updateEmployee);

// Route to delete an employee
router.delete('/employees/:id', authMiddleware.verifyToken, adminController.deleteEmployee);

module.exports = router;