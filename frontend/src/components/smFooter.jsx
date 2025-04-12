import React, { useState } from 'react'
import { LuUsers } from "react-icons/lu";
import { useChatStore } from '../store/useChatStore';
import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Dot } from 'lucide-react';
import { io } from 'socket.io-client';

const SmFooter = () => {

    const { setSelectedUser, selectedUser, isUsersLoading, getUsers, resetChatPage, users } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [userState, setUserState] = useState([])
    const sortedUsers = [...users].sort((a, b) => {
        const isAOnline = Object.values(onlineUsers).includes(a._id);
        const isBOnline = Object.values(onlineUsers).includes(b._id);
        return isBOnline - isAOnline; // online (true) comes first
    });

    useEffect(() => {
        getUsers()
        setUserState(users)
    }, [getUsers]);



    return (
        <div className='w-full bg-base-200 rounded-lg m-2 overflow-y-auto'>
            <div className='p-2'>
                <div className='flex items-center gap-2 p-2'>
                    <LuUsers className='size-6' />
                    <h1 className='font-semibold text-md'>Contacts</h1>
                </div>

                <div className='flex flex-col gap-4 mt-4'>
                    {
                        sortedUsers.map((user) => (
                            <button key={user._id} onClick={() => setSelectedUser(user)} className=' relative w-full bg-base-100 px-2 rounded-lg flex items-center gap-4 h-14'>
                                <div className='flex justify-between w-full items-center'>
                                    <div className='flex items-center gap-2'>
                                        <div className=''>
                                            <img src={user.profilePic || '/user.png'} className='size-8 rounded-full' alt="ProfilePic" />
                                        </div>
                                        <div className='flex flex-col justify-start items-start'>
                                            <span className='font-semibold capitalize'>{user.fullName}</span>
                                            <span className={`capitalize text-[10px] ${Object.values(onlineUsers).includes(user._id) ? "text-green-500" : "text-gray-500"}`}>{Object.values(onlineUsers).includes(user._id) ? "online" : "offline"}</span>
                                        </div>
                                    </div>
                                    <div className='absolute bottom-[-14px] left-1'>
                                        {Object.values(onlineUsers).includes(user._id) ? <Dot className='size-16 text-green-500' /> : <Dot className='size-16 text-gray-500' />}

                                    </div>
                                </div>

                            </button>
                        ))
                    }
                </div>
            </div>

        </div>
    )
}

export default SmFooter
