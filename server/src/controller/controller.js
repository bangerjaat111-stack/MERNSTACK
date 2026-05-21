import user_model from "../model/user_model.js"
import { validname, validemail, validPassword } from "../validation/allvalidation.js"
import { user_verification_otp_send,user_resend_otp } from "../mail/userMailer.js"
import { error } from '../errorhandling/error.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export const register = async (req, res) => {
    try {
        const data = req.body
        const { name, email, password, gender } = data
        // const randomotp=Math.floor(1000+Math.random()*9000)
        const randomotp = crypto.randomInt(1000, 9000)
        const expiretime = Date.now() + 5 * 60 * 1000;



        const checkuser = await user_model.findOneAndUpdate({ email: email },
            {
                $set:
                    { 'verification.user.otp': randomotp, 'verification.user.otpExpireTime': expiretime }
            })
        if (checkuser) {
            if (checkuser.verification.user.isVerify) return res.status(400).send({ status: false, msg: 'Account Already verify pls log In' })
            user_verification_otp_send(email, checkuser.name, randomotp)

            return res.status(200).send({ status: true, msg: "resent Otp Send",id:checkuser._id })
        }
        const DBData = {
            name, email, gender, password, verification: { user: { otp: randomotp, otpExpireTime: expiretime } }
        }
        const DB = await user_model.create(DBData)
        user_verification_otp_send(email, name, randomotp)
        res.status(200).send({ status: true, success: true, msg: 'user created successfully',id:DB._id, data: DB })
    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}

export const verify_otp = async (req, res) => {
    try {
        const { id } = req.params;
        const { userotp } = req.body;

        if (!userotp) {
            return res.status(400).send({ status: false, msg: "pls provide otp" })
        }
        const user = await user_model.findById(id);
        if (!user) { return res.status(404).send({ status: false, msg: "user not found" }) }

        const { otp, otpExpireTime, isVerify } = user.verification.user;

        if (isVerify) { return res.status(400).send({ status: false, msg: "user already verified please login ..." }) }

        if (!(Date.now() <= otpExpireTime)) { return res.status(404).send({ status: false, msg: "otp time is expire please resent otp" }) }

        if (otp != userotp)return res.status(400).send({ status: false, msg: "wrong otp" }) 

        await user_model.findByIdAndUpdate({_id : id}
            ,
            {
                $set:
                    { 'verification.user.isVerify': true }
            }
        )
        return res.status(200).send({ status: true, msg: "account verified succesfully please login ..." })
    }
    catch(err){return error(err,res)}
}



export const resend_otp = async (req, res) => {
    try {
        const {id} =req.params
        const randomotp=crypto.randomInt(1000,9999)
        const expiretime=Date.now()+1000*60*5
        const updatedotp=await user_model.findOneAndUpdate({_id:id,'verification.user.isVerify':false},
            {$set:{'verification.user.otp':randomotp,'verification.user.otpExpireTime':expiretime}}
        )
        if(!updatedotp) return res.status(404).send({status:false, msg:'user not found'})
        user_resend_otp(updatedotp.email,updatedotp.name,randomotp)
        res.status(200).send({status:true , msg:'resend otp send'})
        

    }
    catch (err) { res.status(400).send({ status: false, msg: err.message }) }
}


 

export const log_in = async (req, res) => {
    try {
        const { email, password } = req.body    
        const checkuser = await user_model.findOne({ email: email })
        if (!checkuser) return res.status(404).send({ status: false, msg: 'user not found' })
        if (checkuser) {
            const { isVerify, isDelete, block } = checkuser.verification.user
            if (!isVerify) return res.status(404).send({ status: false, msg: 'please verify otp',id:checkuser._id })
            if (isDelete) return res.status(404).send({ status: false, msg: 'account is delete' })
            if (block) return res.status(404).send({ status: false, msg: 'your account is block' })
        }
        const checkpass = await bcrypt.compare(password, checkuser.password)
        if (!checkpass) return res.status(404).send({ status: false, msg: 'wrong password' })
        const token=jwt.sign({id:checkuser.id},process.env.usertokenkey,{expiresIn:'1d'})
        return res.status(200).send({status:true,msg:'login successfully',token,id:checkuser._id})

    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}







// status code
// 201 create new data
// 200 ok
// 400 bad request by user side
// 404 not found
// 500 internal server error
