const Employee = require('../models/employee');

module.exports = {
  async createEmployee(req, res) {
    try {
      const { email, password, name } = req.body;
      const employee = new Employee({ email, password, name });
      await employee.save();
      res.status(201).json({ message: 'Employee created successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  },

async getEmployee(req, res) {
    try {
      const employee = await Employee.findById(req.params.id);
      res.json(employee);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
},

async updateEmployee(req, res) {
    try {
      const { email, password, name } = req.body;
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        { email, password, name },
        { new: true }
      );
      res.json(employee);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
},

  async deleteEmployee(req, res) {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' });
    }
  },
};