import React from 'react'
import { useChatStore } from '../store/useChatStore.js'
import MessageHeader from './MessageHeader.jsx';
import MessageBody from './MessageBody.jsx';
import MessageInput from './MessageInput.jsx';


const ChatContainer = () => {
  const { messages, isMessagesLoading, getMessages, setSelectedUser } = useChatStore();
  return (

    <div className='relative lg:w-[70%] w-full  bg-base-100 p-4'>
      <div className='h-[90%] w-full bg-base-200 rounded-lg'>
        <MessageHeader />
        <MessageBody />
        <MessageInput />

      </div>
    </div>

  )
}

export default ChatContainer
