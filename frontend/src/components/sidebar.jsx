import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import { LuUsers } from "react-icons/lu";
import { Dot } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { io } from 'socket.io-client';

const Sidebar = () => {
    const {users, setSelectedUser,selectedUser, isUsersLoading, getUsers} = useChatStore();
    const [userState, setUserState] = useState([])
    const {onlineUsers, socket} = useAuthStore();
    const sortedUsers = [...userState].sort((a, b) => {
        const isAOnline = Object.values(onlineUsers).includes(a._id);
        const isBOnline = Object.values(onlineUsers).includes(b._id);
        return isBOnline - isAOnline; // online (true) comes first
      });
    
    useEffect(() => {
       getUsers()
       setUserState(users)
    }, [getUsers]);

    
    

  return (
    <div className='hidden lg:flex h-full w-[30%]'>
        <div className='flex flex-col w-full'>
            <div className='p-4'>
                <div className='p-2 flex gap-2 items-center'>
                    <LuUsers className='size-6' />
                    <p className='text-lg font-semibold'>Contacts</p>
                </div>
            </div>
            <div className='mx-4 overflow-y-auto'>
                <div className='flex flex-col gap-2 over'>
                {
            isUsersLoading &&<p>Loading...</p>
        }
                    {
                        sortedUsers.map((user)=>(
                            <button key={user._id} onClick={()=>setSelectedUser(user)} className={`flex items-center gap-4 p-2 rounded-lg hover:bg-base-300 transition-color w-full
                            ${selectedUser?._id===user._id?"bg-base-300":""}
                            `}> 
                            {/* {console.log(selectedUser)} */}
                                <div className='max-w-10 relative'>
                                    <img src={user.profilePic || '/user.png'} className='rounded-full p-1 border-2 aspect-square'/>
                                    {
                                        Object.values(onlineUsers).includes(user._id)?<Dot className='absolute bottom-[-20px] right-[-20px] size-14 text-green-500'/>:<Dot className='absolute bottom-[-20px] right-[-20px] size-14 text-gray-500'/>
                                    }
                                </div>
                                
                                <div className='flex flex-col items-start justify-start'>
                                    <p className='capitalize'>{user.fullName}</p>
                                    <p className={`text-xs ${ Object.values(onlineUsers).includes(user._id)?"text-green-500":"opacity-60"}`}> {
                                        Object.values(onlineUsers).includes(user._id)?"online":"offline"
                                    }</p>
                                </div>
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
