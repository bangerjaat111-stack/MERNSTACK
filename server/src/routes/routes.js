import express from 'express'
import { register, verify_otp, log_in } from '../controller/controller.js'

const route = express.Router()

// User Routes
route.post('/user/register', register)
route.post('/user/verify_otp', verify_otp)
route.post('/user/log_in', log_in)



export default route