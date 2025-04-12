import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import { useState } from 'react';
import { Link } from 'react-router-dom'
import { Eye, EyeClosed, Loader, Loader2, Lock, Mail, MessagesSquare, User } from 'lucide-react'

import AnimatedBlock from '../components/AnimatedBlock.jsx';
import toast from 'react-hot-toast';
import { GiMonkey } from 'react-icons/gi';


const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName) return toast.error("Name is required");
    if (!formData.email) return toast.error("email is required");
    if (formData.password.length < 6) return toast.error("password must be greater than 6 letter");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return toast.error("email is Incorrect");

    return true;

  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();

    if (success) signup(formData)
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2 overflow-x-hidden'>
      <div className='flex flex-col justify-center items-center p-6 sm:p-8'>
        <div className='w-full max-w-md space-y-5'>

          <div className='flex flex-col items-center gap-1 group'>
            <div className='size-12 rounded-xl bg-[hsl(var(--primary)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--primary)/0.2)] transition-colors'>
              <GiMonkey className='size-6 text-primary' />
            </div>
            <h1 className='text-2xl font-bold mt-2'>
              Create Account
            </h1>
            <p className='text-base-content text-sm opacity-60'>
              Get started with your free account
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>
                  Full Name
                </span>
              </label>
              <div className='relative'>
                <div className='absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-base-content opacity-40' />
                </div>
                <input type='text' className='mt-1 input pl-10 w-full  ' placeholder='Soyam Paul' value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} />
              </div>
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>
                  Email
                </span>
              </label>
              <div className='relative'>
                <div className='absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Mail className='size-5 text-base-content opacity-40' />
                </div>
                <input type='text' className='mt-1 input pl-10 w-full  ' placeholder='soyampaul@gmail.com' value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value.toLowerCase() })} />
              </div>
            </div>

            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>
                  Password
                </span>
              </label>
              <div className='relative'>
                <div className='absolute z-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <Lock className='size-5 text-base-content opacity-40' />
                </div>
                <input type={showPassword ? "text" : "password"} className='mt-1 input pl-10 w-full  ' placeholder='••••••••••' value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />

                <button type='button' onClick={() => { setShowPassword(!showPassword) }} className='absolute z-10 inset-y-0 right-2 top-1 flex items-center'>
                  {showPassword ? <Eye className='size-5 text-base-content opacity-40' /> : <EyeClosed className='size-5 text-base-content opacity-40' />}
                </button>
              </div>
            </div>

            <button type='submit' className='btn btn-primary w-full' disabled={isSigningUp}>
              {
                isSigningUp ? (
                  <div className='flex gap-2 items-center'>
                    <Loader2 className='size-5 animate-spin' />
                    <p>Loading...</p>
                  </div>
                ) :
                  "Create Account"

              }
            </button>

          </form>
          <div className='text-center text-sm'>
            <p className='text-base-content opacity-60'>
              Already have an account?{" "}
              <Link to='/login' className='link link-primary'>
                Sign in
              </Link>
            </p>

          </div>
        </div>
      </div>

      <AnimatedBlock
        title="Join Our Community"
        Description="Connect with friends, sharemoments and stay in touch with your loved once"
      />
    </div>
  )
}

export default SignupPage
