import user_model from "../model/user_model.js"

export const register = async (req, res) => {
    try {
        const data = req.body
        const { name, email, password, gender } = data


        if (!name) return res.status(400).send({ status: false, sucess: false, message: "Name is Required" })
        if (!email) return res.status(400).send({ status: false, sucess: false, message: "Email is Required" })
        if (!password) return res.status(400).send({ status: false, sucess: false, message: "Password is Required" })

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