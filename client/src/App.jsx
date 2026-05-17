import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'

import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Signup from './components/Auth/Signup.jsx'
import Signin from './components/Auth/Signin.jsx'     
import Otp from '../src/components/Otp.jsx'


import NewCars from './components/Menu/Newcar.jsx'
import UsedCars from './components/Menu/Usedcars.jsx'
import News from './components/Menu/News.jsx'
import Videos from './components/Menu/Videos.jsx'
import Sell from './components/Menu/Sellcar.jsx'
import Hotdeals from './components/Menu/Hotdeals.jsx'

export default function App() {

  return (

    <div>

      <BrowserRouter>

        {/* NAVBAR */}
        <Navbar />

        {/* ROUTES */}
        <Routes>

          {/* AUTH ROUTES */}
          <Route path='/signup' element={<Signup />} />

          <Route path='/signin' element={<Signin />} />
          <Route path='/verify_otp/:id' element={<Otp/>}/>

          {/* NAVBAR MENU ROUTES */}
          <Route path='/' element={<NewCars />} />

          <Route path='/used-cars' element={<UsedCars />} />

          <Route path='/news' element={<News />} />

          <Route path='/videos' element={<Videos />} />

          <Route path='/sell' element={<Sell />} />
          <Route path='/deals' element={<Hotdeals/>}/>

        </Routes>

      
        <Footer />

      </BrowserRouter>

    </div>

  )
}