import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'

import Navbar from './components/Navbar/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Signup from './components/Auth/Signup.jsx'
import Signin from './components/Auth/Signin.jsx'     
import Otp from '../src/components/Otp.jsx'
import Home from '../src/components/Menu/Home.jsx'
import Newcars from './components/Menu/Newcars.jsx'
import UsedCars from './pages/UsedCars.jsx'
import UsedCarDetail from './pages/UsedCarDetail.jsx'
import SellCar from './pages/SellCar.jsx'
import MyListings from './pages/MyListings.jsx'
import News from './components/Menu/News.jsx'
import Videos from './components/Menu/Videos.jsx'
import Hotdeals from './components/Menu/Hotdeals.jsx'
import ProfilePage from './components/Navbar/ProfilePage.jsx'
import SettingPage from './components/Navbar/SettingPage.jsx'
import ProtectedRoute from './components/Auth/ProtectedRoute.jsx'
import PublicRoute from './components/Auth/PublicRoute.jsx'

export default function App() {

  return (

    <div>

      <BrowserRouter>

        {/* NAVBAR */}
        <Navbar />

        {/* ROUTES */}
        <Routes>

          {/* AUTH ROUTES */}
          <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>} />
          <Route path='/signin' element={<PublicRoute><Signin /></PublicRoute>} />
          <Route path='/verify_otp/:id' element={<Otp/>}/>

          {/* NAVBAR MENU ROUTES */}
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/new-cars' element={<ProtectedRoute><Newcars /></ProtectedRoute>} />
          <Route path='/newcars' element={<ProtectedRoute><Newcars /></ProtectedRoute>} />
          <Route path='/used-cars' element={<ProtectedRoute><UsedCars /></ProtectedRoute>} />
          <Route path='/used-car/:id' element={<ProtectedRoute><UsedCarDetail /></ProtectedRoute>} />
          <Route path='/used-cars/:id' element={<ProtectedRoute><UsedCarDetail /></ProtectedRoute>} />
          <Route path='/news' element={<ProtectedRoute><News /></ProtectedRoute>} />
          <Route path='/videos' element={<ProtectedRoute><Videos /></ProtectedRoute>} />
          <Route path='/video' element={<ProtectedRoute><Videos /></ProtectedRoute>} />
          <Route path='/sell' element={<ProtectedRoute><SellCar /></ProtectedRoute>} />
          <Route path='/sell-car' element={<ProtectedRoute><SellCar /></ProtectedRoute>} />
          <Route path='/my-listings' element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
          <Route path='/profile/my-cars' element={<ProtectedRoute><MyListings /></ProtectedRoute>} />
          <Route path='/deals' element={<ProtectedRoute><Hotdeals/></ProtectedRoute>}/>

          {/* USER PROFILE & SETTING ROUTES */}
          <Route path='/profile' element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          <Route path='/setting' element={<ProtectedRoute><SettingPage /></ProtectedRoute>} />

        </Routes>

      
        <Footer />

      </BrowserRouter>

    </div>

  )
}