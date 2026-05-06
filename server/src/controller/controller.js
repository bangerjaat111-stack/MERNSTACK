import user_model from "../model/user_model.js"
import { validname, validemail, validPassword } from "../validation/allvalidation.js"
import { user_verification_otp_send } from "../mail/userMailer.js"
import {error} from '../errorhandling/error.js'
import crypto from 'crypto'

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
            if (checkuser.verification.user.isVerify) return res.status(400).send({ status: true, msg: 'Account Already verify pls log In' })
            user_verification_otp_send(email, checkuser.name, randomotp)
        
            return res.status(200).send({ status: true, msg: "resent Otp Send" })
        }
         const DBData = {
            name, email, gender, password, verification: { user: { otp: randomotp, otpExpireTime: expiretime } }
        }
        const DB = await user_model.create(DBData)
        user_verification_otp_send(email, name, randomotp)
        res.status(200).send({ status: true, success: true, message: 'user created successfully', data: DB })
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

        if (isVerify) { return res.status(409).send({ status: false, msg: "user already verified please login ..." }) }

        if (!(Date.now() <= otpExpireTime)) { return res.status(404).send({ status: false, msg: "otp time is expire please resent otp" }) }

        if (otp != userotp ) { res.status(400).send({ status: true, message: "otp is not match" }) }

        await user_model.findByIdAndUpdate({ _id: id },
            { $set:
                 { 'verification.user.isVerify': true } }
        )
        return res.status(200).send({ status: true, msg: "account verified succesfully please login ..." })
    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}


export const resent_otp=async (req,res)=>{
    try{

    }
    catch(err){res.status(400).send({status:false , message:err.message})}
}








export const log_in = async (req, res) => {
    try {

    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}







// status code
// 201 create new data
// 200 ok
// 400 bad request by user side
// 404 not found
// 500 internal server error