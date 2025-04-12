import { LogOut, Settings, User } from 'lucide-react';
import React, { useEffect, useState } from 'react'
// import userImg from '../assets/user.png';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore.js';
import { useChatStore } from '../store/useChatStore.js';
import { GiMonkey } from "react-icons/gi";
const Navbar = () => {
  const { authUser, logout, updateProfile } = useAuthStore()
  const {resetChatPage} = useChatStore()
  const [ProfilePicture, setProfilePicture] = useState(null)
  const logOutFn = () =>{
    logout();
    resetChatPage();
    
  }
  useEffect(() => {
   setProfilePicture(authUser?.profilePic)
  }, [authUser])
  
  
  return (
    <header className='bg-base-100 opacity-80 border-b border-base-300 fixed w-full'>
      <div className='container mx-auto px-10 h-12 flex items-center justify-between'>
        <Link to={"/"} className='flex items-center gap-2 group'>
          <div className='size-8 rounded-md flex items-center justify-center bg-[hsl(var(--primary)/0.1)] group-hover:bg-[hsl(var(--primary)/0.2)] transition-colors'>
            <GiMonkey className='h-6 w-6 text-primary' />
          </div>
          <h1 className='font-semibold'>Monkey Says</h1>
        </Link>

        <div className='flex items-center gap-6'>

          {authUser &&
            (
              <>
                <Link to={"/profile"} className='max-lg:hidden flex gap-2 items-center'>
                  <img src={ProfilePicture || '/user.png'} className='rounded-full size-6'/>
                  <span className='hidden lg:inline'>{authUser.fullName}</span>
                </Link>

                <button onClick={logOutFn} className='flex items-center gap-1 align-middle border rounded-xl px-2 py-1 opacity-70 hover:opacity-100 transition-opacity'>
                  <LogOut className='w-4 h-4' />
                  <span className='hidden text-[15px] lg:inline'>Logout</span>
                </button>
              </>
            )
          }
        </div>
      </div>
    </header>
  )
}



export default Navbar
