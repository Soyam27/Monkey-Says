import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { X } from 'lucide-react'

const MessageHeader = () => {
    const {setSelectedUser,selectedUser} = useChatStore()
  return (
    <div className='w-full'>
        <div className='flex justify-between items-center'>
            <div className='flex items-center mx-4 my-2 gap-3'>
            <img src={selectedUser.profilePic || '/user.png'} className='size-10 border-2 p-0.5 rounded-full'/>
            <h1>
                {selectedUser.fullName}
            </h1>
            </div>
            <div className='mx-3 flex items-center'>
                <X className='size-6 hover:cursor-pointer' onClick={()=>setSelectedUser(null)}/>
            </div>
        </div>
      
    </div>
  )
}

export default MessageHeader
