import { GiMonkey } from "react-icons/gi";
import React from 'react'

const NoChatSelected = () => {
  return (
    <div className='lg:w-[70%] w-full bg-base-100 h-full p-4 hidden lg:flex'>
        <div className=' h-full w-full bg-base-200 rounded-lg'>
            <div className='flex items-center justify-center flex-col h-full gap-6'>

                <div className='bg-[hsl(var(--primary)/0.1)] size-14 flex items-center justify-center rounded-lg animate-bounce'>
                    <GiMonkey  className='text-primary w-9 h-9'/>
                </div>

                <div className='flex items-center flex-col gap-3'>
                    <h1 className='text-xl font-bold'>
                        Welcome to Monkey Says!
                    </h1>
                    <p className='text-sm'>Select a communication to start chat from the side bar.</p>
                </div>

            </div>

        </div>
    </div>
  )
}

export default NoChatSelected
