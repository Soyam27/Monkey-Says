import express from 'express';
import http from 'http';
import {Server} from 'socket.io';

const app = express()
const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: "http://localhost:5173"
    }
})

export const getReceiverSocketId = (userId) => {
    return userSocketMap[userId];
}

const userSocketMap = {};
io.on("connection", (socket) =>{

    
    const userId = socket.handshake.query.userId;
    
    if(userId) userSocketMap[userId] = socket.id
    
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    io.emit('NEW_USER', null);
    io.emit('NEW_PROFILE', null);
    console.log(userSocketMap)
    socket.on("disconnect",()=>{
        console.log("A user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    })
})
export {app,server,io}