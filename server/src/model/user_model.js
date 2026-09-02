import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import {validname,validemail,validPassword} from '../validation/allvalidation.js'


const UserSchema = new mongoose.Schema({
    profileImg: { type: Object, required: false },
    name: { type: String, required: [true,'name is required'],
        validate:[validname,'invalid name'], trim: true },
   email: {
        type: String, required: [true, 'Email is required'],
        validate: [validemail, 'Invalid Email'], trim: true, unique: true, lowercase: true
    },
    password: {
        type: String, required: [true, 'Password is required'],
        validate: [
            (pass) => pass.startsWith('$2b$') || pass.startsWith('$2a$') || validPassword(pass),
            'Invalid password. Must be at least 8 characters with 1 uppercase, 1 lowercase, and 1 number.'
        ],
        trim: true
    },

    gender: {
        type: String, enum: ['male', 'female', 'other'], required: [true, 'Gender is required'],
       trim: true
    },
    wishlist: {
        type: Array, default: []
    },
    listings: {
        type: Array, default: []
    },
    testDrives: {
        type: Array, default: []
    },
    offers: {
        type: Array, default: []
    },
    loginActivity: {
        type: Array, default: []
    },
    forgotPassword: {
        otp: { type: Number, default: null },
        otpExpireTime: { type: Number, default: null }
    },
    verification: {
        user: {
            isVerify: { type: Boolean, default: false },
            otpExpireTime: { type: Number, default: null },
            otp: { type: Number, default: null },
            block: { type: Boolean, default: false },
            blockStatus: { type: String, default: null, enum: [] },
            isDelete: { type: Boolean, default: false },
        },
        admin: {
            otp: { type: Number, default: null },
            isVerify: { type: Boolean, default: false },
        }
    }
})

UserSchema.pre('save', async function() {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
})
export default mongoose.model('User', UserSchema)