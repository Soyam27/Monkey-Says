import { MessagesSquare, UserRoundPen } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';



const FooterMenu = () => {
    const {authUser} = useAuthStore()
    const {setSelectedUser} = useChatStore()
    return (
        <footer className={`fixed bottom-0 left-0 w-full py-2 shadow-md z-50 lg:hidden ${authUser?"":"hidden"}`}>
          <div className="mx-auto w-[80%] flex items-center justify-center flex-wrap">
            <Link to="/" onClick={()=>setSelectedUser(null)}>
              <button className="pr-8 border-r border-gray-300 flex gap-2">
                <MessagesSquare/>
                <p className="font-semibold">Chats</p>
              </button>
            </Link>
            <Link to="/profile">
              <button className="pl-8 flex gap-2">
              <UserRoundPen />
                <p className="font-semibold">Profile</p>
              </button>
            </Link>
          </div>
        </footer>
      );
}

export default FooterMenu;
