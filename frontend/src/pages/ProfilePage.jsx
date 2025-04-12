import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { Camera, Mail, User } from 'lucide-react'
import FooterMenu from '../components/footerMenu.jsx'
import { compressImage } from '../lib/imgCompression.js'


const ProfilePage = () => {

  const [selectedImg, setSelectedImg] = useState(null)
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()

  const handleImageUpload = async (e) =>{
    const file = e.target.files[0];
    if(!file) return;
    const compressedFile = await compressImage(file);
    const reader = new FileReader();

    reader.readAsDataURL(compressedFile);

    reader.onload = async ()=>{
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({profilePic: base64Image});

    }



  }

  return (
    <div className='h-screen pt-5'>
      <div className='max-w-2xl mx-auto p-6 py-8'>
        <div className='bg-base-300 rounded-xl p-6 space-y-10'>
          <div className='text-center'>

            <h1 className='text-xl font-semibold'>
              Profile
            </h1>
            <p className='mt-2'>
              Your profile Information
            </p>
          </div>
          <div className='flex flex-col items-center gap-4'>
            <div className='relative'>

              <img src={selectedImg || authUser.profilePic || '/user.png'} alt="Profile" className='size-32 rounded-full object-cover border-4 p-1' />

              <label htmlFor='avatar-upload' className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}`}>

                <Camera className='w-5 h-5 text-base-200' />
                <input type='file' id='avatar-upload' className='hidden' accept='images/*' onChange={handleImageUpload} disabled={isUpdatingProfile} />

              </label>
            </div>
            <p>
              {isUpdatingProfile ? "Updating..." : "Click the camera icon toupdate your photo"}
            </p>
          </div>

          <div className='space-y-8'>
            <div className='space-y-2'>
              <div className='text-md px-1 text-zinc-400 flex items-center gap-2'>
                <User className='w-4 h-4' />
                Full Name
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.fullName}</p>
            </div>
            <div className='space-y-2'>
              <div className='text-md px-1 text-zinc-400 flex items-center gap-2'>
                <User className='w-4 h-4' />
                Email
              </div>
              <p className='px-4 py-2.5 bg-base-200 rounded-lg border'>{authUser?.email}</p>
            </div>
          </div>

        </div>

      </div>
    
    </div>
  )
}

export default ProfilePage
