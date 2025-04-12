import cloudinary from "../lib/cloudinaryConfig.js";
import { getReceiverSocketId, io } from "../lib/socketConfig.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUserForSidebar = async (req,res) =>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne: loggedInUserId}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in getUserForsidebar controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getMessages = async (req,res) =>{
    try {
        const {id:userToChatId} = req.params;
        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                {
                    senderId: myId,
                    receiverId: userToChatId,
                },
                {
                    senderId: userToChatId,
                    receiverId: myId,
                }
            ]
        })

        res.status(200).json(messages);
    } catch (error) {
        console.log("error in getMessages controller",error.message);
        res.status(500).json({message:"Internal server error"});
    }
}

export const sendMessage = async (req,res) =>{

    try {
        const {text,image} = req.body;
        const {id: userToChatId} = req.params;
        const myId = req.user._id;
        let imgUrl;
    
        if(image){
            const cloudinaryResponse = await cloudinary.uploader.upload(image);
            imgUrl = cloudinaryResponse.secure_url;
        }
    
        const newMessage = new Message({
            senderId:myId,
            receiverId:userToChatId,
            text,
            image: imgUrl,
        });
    
        await newMessage.save();

        const receiverSocketId = getReceiverSocketId(userToChatId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("error in getMessage controller",error);
        res.status(500).json({message:"Internal server error here"});
    }
   
}