import express, { Router } from 'express'
import {
  register, verify_otp, resend_otp, log_in, getUserProfile, updateUserProfile,
  forgot_password, reset_password, getWishlist, toggleWishlist, changePassword,
  getUserListings, addUserListing, deleteUserListing,
  getUserTestDrives, addTestDrive, getUserOffers, addOffer
} from '../controller/controller.js'

import {car} from '../controller/car.js'
import { video, createVideo, deleteVideo } from '../controller/video.js'
import {
  createUsedCar,
  getPublicUsedCars,
  getUserUsedCars,
  getUsedCarById,
  updateUsedCarStatus,
  deleteUsedCar
} from '../controller/usedCar_controller.js'
const route = express.Router()

// Video Routes
route.get('/video', video)
route.get('/videos', video)
route.post('/video', createVideo)
route.post('/videos', createVideo)
route.delete('/video/:id', deleteVideo)
route.delete('/videos/:id', deleteVideo)

route.get('/car', car)
route.get('/cars', car)
route.post('/register', register)
route.post('/verify_otp/:id', verify_otp)
route.get('/resend_otp/:id', resend_otp)
route.post('/log_in', log_in)
route.get('/user/:id', getUserProfile)
route.put('/user/:id', updateUserProfile)
route.put('/user/:id/change-password', changePassword)
route.put('/update_password/:id', changePassword)

// Password Reset Routes
route.post('/forgot_password', forgot_password)
route.post('/reset_password/:id', reset_password)

// Wishlist Routes
route.get('/user/:id/wishlist', getWishlist)
route.post('/user/:id/wishlist', toggleWishlist)

// Listings & Used Cars Routes
route.get('/user/:id/listings', getUserListings)
route.post('/user/:id/listings', addUserListing)
route.delete('/user/:id/listings/:listingId', deleteUserListing)

route.post('/used-cars', createUsedCar)
route.get('/used-cars', getPublicUsedCars)
route.get('/used-cars/my/:userId', getUserUsedCars)
route.get('/used-cars/:id', getUsedCarById)
route.put('/used-cars/:id/status', updateUsedCarStatus)
route.delete('/used-cars/:id', deleteUsedCar)

// Test Drives & Offers Routes
route.get('/user/:id/test-drives', getUserTestDrives)
route.post('/user/:id/test-drives', addTestDrive)
route.get('/user/:id/offers', getUserOffers)
route.post('/user/:id/offers', addOffer)



export default route