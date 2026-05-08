import React from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import Profile from './components/Profile/Profile.jsx'
import Login from './components/Auth/Login.jsx'
import Signup from './components/Auth/Signup.jsx'
export default function App() {
  return (
    <div>
      <Navbar/>
      <Profile/>
      <Login/>
      <Signup/>
      </div>
  )
}
