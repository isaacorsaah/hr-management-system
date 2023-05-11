const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {check, validationResult} = require('express-validator');
const auth = require('../utils/auth');
const Admin = require('../models/admin');
const Employee = require('../models/employee');

router.post(
    '/login',
    [
        check('email').isEmail().normalizeEmail(),
        check('password').notEmpty().trim(),
    ],
    async(req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        const {email, password} = req.body;
        let user;
        if(role === 'admin'){
            user= await Admin.findOne({email});
        }else if (role === 'employee'){
            user = await Employee.findOne({email});
        }
        if(!user){
            return res.status(401).json({message: 'Invalid credentials'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({message: 'Invalid credentials'});
        }
        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JWT_SECRET);
        res.json({token});
    }
);

