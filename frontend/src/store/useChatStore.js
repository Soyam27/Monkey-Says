import {create} from 'zustand'
import { axiosInstance } from '../lib/axiosConfig'
import toast from 'react-hot-toast'
import { useAuthStore } from './useAuthStore'

export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async ()=>{
        set({isUsersLoading:true})
        try {
            const res = await axiosInstance.get('/messages/user')
            set({users: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading:false})
        }
    },
    getMessages: async (userId)=>{
        set({messages:[]})
        set({isMessagesLoading:true})
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isMessagesLoading:false})
        }
    },
    sendMessages: async(data)=>{
        try {
            
            const {messages,selectedUser} = get();
            const res = await axiosInstance.post(`messages/send/${selectedUser._id}`,data);
            set({messages:[...messages,res.data]});            
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    },
    liveMessageUpdate: () => {
        const { selectedUser, messages } = get();
        if (!selectedUser) return;
    
        const socket = useAuthStore.getState().socket;
    
        socket.on("newMessage", (newMessage) => {
            if(newMessage.senderId === selectedUser._id){
            set({
                messages: [...get().messages, newMessage]
            });
        }
        });
    },
    resetChatPage: ()=>{
        set({
            messages: [],
            users: [],
            selectedUser: null,
            isUsersLoading: false,
            isMessagesLoading: false,
          })
    },
      
    setSelectedUser: (selectedUser) => {
        
        set({selectedUser:selectedUser})

}
}))