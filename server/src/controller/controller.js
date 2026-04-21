import user_model from "../model/user_model.js"
import { validname, validemail, validPassword } from "../validation/allvalidation.js"

export const register = async (req, res) => {
    try {
        const data = req.body
        const { name, email, password, gender } = data
        const nameregex = /^[a-z A-Z ]{0,50}$/
        const emailregex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        const passwordregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/

        if (!name) return res.status(400).send({ status: false, sucess: false, message: "Name is Required" })
        if (!validname(name)) return res.status(400).send({status:false, success: false, message: "invalid name"})
        if (!email) return res.status(400).send({ status: false, sucess: false, message: "Email is Required" })
        if (!validemail(email)) return res.status(400).send({status: false, success: false, message: "invalid email"})
        if (!password) return res.status(400).send({ status: false, sucess: false, message: "Password is Required" })
        if (!validPassword(password)) return res.status(400).send({status: false, success: false, message: "invalid password"})
        
        const checkuser=await user_model.findOne({email:email})
        if (checkuser) return res.status(400).send({status:false, success:false, message:"user already axist"})

        const DB = await user_model.create(data)
        res.status(200).send({ status: true, success: true, message: 'user created successfully', data: DB })
    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}

export const verify_otp = async (req, res) => {
    try {

    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }) }
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