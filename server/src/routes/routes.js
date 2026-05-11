import express from 'express'
import { register, verify_otp,resend_otp ,log_in } from '../controller/controller.js'

const route = express.Router()

// User Routes
route.post('/register', register)
route.post('/verify_otp/:id', verify_otp)
route.get('/resend_otp/:id',resend_otp)
route.post('/log_in', log_in) 



export default route