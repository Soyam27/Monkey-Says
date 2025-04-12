import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import {Toaster} from 'react-hot-toast'
import FooterMenu from './components/footerMenu.jsx'



 
const App = () => {

  const { authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();

  useEffect(() => {
    checkAuth()
  }, [])


  if(isCheckingAuth && !authUser){
    return(
      <div className="flex items-center justify-center h-screen">
       <span className="loading loading-ring loading-xl"></span>
      </div>
    )
  }

 
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={authUser?<HomePage />:<Navigate to={'/login'}/>} />
        <Route path='/signup' element={!authUser?<SignupPage/>:<Navigate to={'/'}/>} />
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to={'/'}/>} />
        <Route path='/profile' element={!authUser?<LoginPage/>:<ProfilePage />} />
      </Routes>


      <Toaster />
      <FooterMenu/>
    </div>
  )
}

export default App
