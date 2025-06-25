const User = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET;

exports.signup = async (req,res)=>{
    const{name,email,password} = req.body;
    try{
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"User is already exists"});
        }
        const hashPassword = await bcrypt.hash(password,10);
        console.log("JWT_SECRET_KEY:", JWT_SECRET_KEY);
        const newUser = await User.create({name,email,password:hashPassword});
        newUser.save()
        const token = jwt.sign({id:newUser._id},JWT_SECRET_KEY,{expiresIn:'1h'});
        if(!token){
            return res.status(400).json({message:"Token is problem"});
        }
        res.status(201).json({token,email:newUser.email});
    }catch(err){
        res.status(500).json({message:"SignUp failed",err});
    }
};

exports.login = async (req,res) => {
    const {email,password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({message:"Invalid Password"});
        }
        const token = jwt.sign({id:user._id},JWT_SECRET_KEY,{expiresIn:'1h'});

        res.status(200).json({token,message:"Login compeleted Successfully"});
    }
    catch(err){
        res.status(500).json({message:"Login Failed",err});
    }
};
