const { request } = require('http')
const User=require('../config/userModel')
const loadRegister =async(req,res)=>{
    try{
        res.render('index')
    }catch(error){
        console.log(error.message)
    }
}
const insertUser=async(req,res)=>{
    try{
        const user=new User({
            name:req.body.name,
            email:req.body.email,
            mobile:req.body.mobile,
            password:req.body.password,
            is_admin:0
        })
        const userData=await user.save();
        if(userData){
            res.render('index',{message:"your registration is completed successfully"})
            console.log("registration success")
        }else{
            res.render('index',{message:"your registration is failed"})
            console.log("registration failed")
        }


    }catch(error){
        console.log(error.message);
    }
}

module.exports={loadRegister,insertUser}