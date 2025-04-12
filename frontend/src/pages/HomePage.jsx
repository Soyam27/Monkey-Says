import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from '../components/sidebar';
import NoChatSelected from '../components/NoChatSelected';
import ChatContainer from '../components/ChatContainer';
import SmFooter from '../components/smFooter';
import FooterMenu from '../components/footerMenu';

const HomePage = () => {
  const {selectedUser} =useChatStore();

  const [isLgUp, setIsLgUp] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsLgUp(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  

  
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-sm w-full h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
            {!selectedUser ? (
              isLgUp ? <NoChatSelected /> : <SmFooter />
            ) : (
              <ChatContainer />
            )}
            

          </div>
        </div>

      </div>
      
    </div>
  )
}

export default HomePage
