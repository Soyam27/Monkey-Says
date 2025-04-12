import cloudinary from "../lib/cloudinaryConfig.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from 'bcryptjs'

export const singup = async (req,res) =>{
    const {fullName,email,password} = req.body
    try{
        if(!fullName ||!email || !password){
            return res.status(400).json({message:"All fields are manditory"})
        }
        if(password.length<6){
            return res.status(400).json({message: "Password must be atleast 6 characters:"});
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"user already exists with this email"});

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        });

        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
            });
        }
        else{
            res.status(400).json({message: 'Invalid user data'});
        }
    } 
    catch(error){
        console.log("error in signup controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const login = async (req,res) =>{
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid credentials"});
        const isPassCorrect = await bcrypt.compare(password,user.password)
        console.log(isPassCorrect)
        if(!isPassCorrect) return res.status(400).json({message:"Invalid credentials"});

        generateToken(user._id,res)

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        })


    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
    
}

export const logout = (req,res) =>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const updateProfile = async (req,res) =>{
    // res.json("congo you are in updateProfile")
    try {
        
        const {profilePic} = req.body;
            
        if(!profilePic) return res.status(400).json({message:"Profile pic is needed"});
        
        const _id = req.user._id;
        
        if(!_id) return res.status(400).json({message:"Id not found"})
        
        const clodinaryResponse = await cloudinary.uploader.upload(profilePic,);
        const updateUser = await User.findOneAndUpdate(_id,{profilePic: clodinaryResponse.secure_url},{new:true});

        res.status(200).json(updateUser);
        
    } catch (error) {
        console.log("error in middleware controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }


}

export const checkAuth = (req,res) =>{
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}