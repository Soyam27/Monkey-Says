import React, { useEffect, useRef } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { useChatStore } from '../store/useChatStore'
import { formatTime } from '../lib/timeToLocale'

const MessageBody = () => {
    const {authUser} = useAuthStore()
    const {messages, selectedUser,getMessages, isMessagesLoading, liveMessageUpdate} = useChatStore()

    const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages]); 


    useEffect(() => {
        if (selectedUser?._id) {
          getMessages(selectedUser._id);
        }
      }, [selectedUser?._id]);
    
      // Setup live socket updates once on mount
      useEffect(() => {
        liveMessageUpdate();

        return () => {
            const socket = useAuthStore.getState().socket;
            socket?.off("newMessage");
          };
      }, [selectedUser._id]);
      
  return (
    <div className='overflow-y-auto h-[85%] p-4 space-y-4'>
        {
            isMessagesLoading &&<p>Loading...</p>
        }
      {
        messages.map((message)=>(
            <div key={message._id} className={`chat ${message.senderId === authUser._id?'chat-end':'chat-start'}`}>
                <div className='avatar chat-image'>
                    <div className='size-10 rounded-full border'>
                        <img src={message.senderId === authUser._id?authUser.profilePic || '/user.png':selectedUser.profilePic || '../public/user.png'} alt="profilePic" />
                    </div>
                </div>
                <div className='chat-bubble'>
                    {message.image &&
                    <img src={message.image} alt="Attachment" className='sm:max-w-[200px] rounded-md ' />
                    }
                    {message.text && <p>{message.text}</p>}
                </div>
                <div className='chat-footer'>
                    <time className='text-sm opacity-50'>
                        {formatTime(message.createdAt)}
                    </time>
                </div>
            </div>
        ))
      }
      <div ref={chatEndRef}/>
    </div >
  )
}

export default MessageBody
