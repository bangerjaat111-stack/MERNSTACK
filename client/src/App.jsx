import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'

import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Login from './components/Auth/Login.jsx'
import Signup from './components/Auth/Signup.jsx'


import NewCars from './components/Menu/Newcar.jsx'
import UsedCars from './components/Menu/Usedcars.jsx'
import News from './components/Menu/News.jsx'
import Videos from './components/Menu/Videos.jsx'
import Sell from './components/Menu/Sellcar.jsx'

export default function App() {

  return (

    <div>

      <BrowserRouter>

        {/* NAVBAR */}
        <Navbar />

        {/* ROUTES */}
        <Routes>

          {/* MAIN ROUTES */}
        

        



          {/* AUTH ROUTES */}
          <Route path='/login' element={<Login />} />

          <Route path='/signup' element={<Signup />} />

          {/* NAVBAR MENU ROUTES */}
          <Route path='/' element={<NewCars />} />

          <Route path='/used-cars' element={<UsedCars />} />

          <Route path='/news' element={<News />} />

          <Route path='/videos' element={<Videos />} />

          <Route path='/sell' element={<Sell />} />

        </Routes>

      
        <Footer />

      </BrowserRouter>

    </div>

  )
}