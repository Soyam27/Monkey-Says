import {create} from 'zustand';
import {axiosInstance} from '../lib/axiosConfig.js'
import toast from 'react-hot-toast';
import { io, Socket } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8000" : "/";

export const useAuthStore = create((set,get)=>({
    authUser: null,
    isSigningUp: false,
    isLogingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    socket: null,
    onlineUsers: {},


    

    checkAuth: async ()=>{
        const {connectSocket} = get();
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
            connectSocket();
            
        } catch (error) {
            console.log("Error in checkAuth",error)
            set({authUser: null});
            
        }finally{

            set({isCheckingAuth: false})
        }
        


    },

    signup: async (data)=>{
        set({isSigningUp: true});
        const {connectSocket} = get();
        try {
            const res = await axiosInstance.post("/auth/signup",data);
            set({authUser: res.data});
            toast.success("Account created successfully");
            connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false});
        }

    },

    logout: async ()=>{
        const {disconnectSocket} = get();
        try {
            await axiosInstance.post("/auth/logout");
            toast.success("Log out successful");
            set({authUser: null});
            disconnectSocket()
            
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    login: async (data)=>{
        set({isLogingIn: true});
        const {connectSocket} = get();
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser: res.data});
            toast.success("Account Logged In successfully");
            connectSocket();
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLogingIn:false});
        }

    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        // console.log(data.profilePic)
    
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data });
            // console.log(res.data.profilePic)
            toast.success("Profile updated successfully!");
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage);
        } finally {
            set({ isUpdatingProfile: false });
        }
    },
    

    connectSocket: ()=>{
        const {authUser,onlineUsers} = get();
        if(!authUser) return;

        const socket = io(BASE_URL,{query:{
            userId: authUser._id
        }});

        set({socket:socket});
        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
        // console.log(onlineUsers)
        
    },
    disconnectSocket: ()=>{
        const{socket} = get();

        if(socket.connected) socket.disconnect();
        set({ socket: null, onlineUsers: {} })
    }

    
}))
