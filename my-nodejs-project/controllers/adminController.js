const Admin = require('../models/admin');
module.exports = {
    async createAdmin(req,res){
        try{
            const {email, password, name} = req.body;
            const admin = new Admin({email, password, name});
            await admin.save();
            res.status(201).json({message: 'Admin created successfully'});
        }catch(error){
            console.log(error);
            res.status(500).json({message: 'Server error'});
        }
    },
    async getAdmin(req,res){
        try{
            const admin = await Admin.findById(req.params.id);
            res.json(admin);
        }catch(error){
            console.log(error);
            res.status(500).json({message: 'Server error'});
        }
    },
    async updateAdmin(req,res){
        try{
            const{email, password, name} = req.body;
            const admin = await Admin.findByIdAndUpdate(
                req.params.id,
                {email, password, name},
                {new:true}
            );
            res.json(admin);
        }catch(error){
            console.log(error);
            res.status(500).json({message:'Server error'});
        }
    },
    async deleteAdmin(req,res){
        try{
            await Admin.findByIdAndDelete(req.params.id);
            res.json({message:'Admin deleted successfully'});
        }catch(error){
            console.log(error);
            res.status(500).json({message:'Server error'});
        }
    },
};