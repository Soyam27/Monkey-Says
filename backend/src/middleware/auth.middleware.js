import  jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const profileAuth = async (req,res,next) =>{
    try {
        const userCookieJwt = req.cookies.jwt;
        if(!userCookieJwt) return res.status(401).json({message:"User not Authorised: No token found"});
    
        const decoded = jwt.verify(userCookieJwt,process.env.JWT_SECRET);
    
        if(!decoded) return res.status(401).json({message: 'Unauthorised: Wrong token'});
        
        const user = await User.findById(decoded._id).select("-password")

        if(!user) return res.status(401).json({message:'User not found'});
    
        req.user = user;
    
        next();

    } catch (error) {
        console.log("error in middleware controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }

}