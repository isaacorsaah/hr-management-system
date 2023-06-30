//createInitialUsers.js
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const connectionString = 'mongodb+srv://hr-ms:isaac@cluster1.gfnogox.mongodb.net/';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

async function createUsers() {
    const adminPassword = await bcrypt.hash('aaa', 10);
    const employeePassword = await bcrypt.hash('bbb', 10);

    const adminUser = new User({
        email: 'admin@admin.com',
        username: 'admin',
        password: adminPassword,
        role: 'Admin'
    });

    const employeeUser = new User({
        email: 'employee@employee.com',
        username: 'employee',
        password: employeePassword,
        role: 'Employee'
    });

    adminUser.save()
        .then(() => console.log('Admin user created'))
        .catch(err => console.log(err));

    employeeUser.save()
        .then(() => console.log('Employee user created'))
        .catch(err => console.log(err));
}

createUsers();