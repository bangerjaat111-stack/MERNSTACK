import user_model from "../model/user_model.js"
import { validname, validemail, validPassword } from "../validation/allvalidation.js"
import { user_verification_otp_send, user_resend_otp, user_forgot_password_otp_send, user_welcome_email_send } from "../mail/userMailer.js"
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

            return res.status(200).send({ status: true, msg: "resent Otp Send", id: checkuser._id })
        }
        const DBData = {
            name, email, gender, password, verification: { user: { otp: randomotp, otpExpireTime: expiretime } }
        }
        const DB = await user_model.create(DBData)
        user_verification_otp_send(email, name, randomotp)
        res.status(200).send({ status: true, success: true, msg: 'user created successfully', id: DB._id, data: DB })
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

        if (otp != userotp) return res.status(400).send({ status: false, msg: "wrong otp" })

        await user_model.findByIdAndUpdate({ _id: id },
            {
                $set:
                    { 'verification.user.isVerify': true }
            }
        )

        // Send Welcome Email upon first time registration verification
        user_welcome_email_send(user.email, user.name);

        return res.status(200).send({ status: true, msg: "account verified succesfully please login ..." })
    }
    catch (err) { return error(err, res) }
}

export const resend_otp = async (req, res) => {
    try {
        const { id } = req.params
        const randomotp = crypto.randomInt(1000, 9999)
        const expiretime = Date.now() + 1000 * 60 * 5
        const updatedotp = await user_model.findOneAndUpdate({ _id: id, 'verification.user.isVerify': false },
            { $set: { 'verification.user.otp': randomotp, 'verification.user.otpExpireTime': expiretime } }
        )
        if (!updatedotp) return res.status(404).send({ status: false, msg: 'user not found' })
        user_resend_otp(updatedotp.email, updatedotp.name, randomotp)
        res.status(200).send({ status: true, msg: 'resend otp send' })
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
            if (!isVerify) return res.status(404).send({ status: false, msg: 'please verify otp', id: checkuser._id })
            if (isDelete) return res.status(404).send({ status: false, msg: 'account is delete' })
            if (block) return res.status(404).send({ status: false, msg: 'your account is block' })
        }
        const checkpass = await bcrypt.compare(password, checkuser.password)
        if (!checkpass) return res.status(404).send({ status: false, msg: 'wrong password' })
        
        // Record login activity
        const newActivity = {
            timestamp: new Date().toISOString(),
            location: 'Gurgaon, Haryana, India',
            ip: req.ip || '127.0.0.1',
            device: 'Chrome Web Browser (Windows)'
        };
        checkuser.loginActivity = [newActivity, ...(checkuser.loginActivity || [])].slice(0, 10);
        await checkuser.save();

        const token = jwt.sign({ id: checkuser.id }, process.env.usertokenkey, { expiresIn: '1d' })
        return res.status(200).send({ status: true, msg: 'login successfully', token, id: checkuser._id })
    }
    catch (err) { res.status(500).send({ status: false, msg: err.message }) }
}

export const getUserProfile = async (req, res) => {
    try {
        const { id } = req.params
        const user = await user_model.findById(id).select('-password')
        if (!user) return res.status(404).send({ status: false, msg: 'User not found' })
        return res.status(200).send({ status: true, data: user })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const { id } = req.params
        const { name, gender } = req.body
        const updatedUser = await user_model.findByIdAndUpdate(
            id,
            { $set: { name, gender } },
            { new: true }
        ).select('-password')
        if (!updatedUser) return res.status(404).send({ status: false, msg: 'User not found' })
        return res.status(200).send({ status: true, msg: 'Profile updated successfully', data: updatedUser })
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

export const forgot_password = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).send({ status: false, msg: "Email is required" });
        const user = await user_model.findOne({ email });
        if (!user) return res.status(404).send({ status: false, msg: "User not found with this email" });

        const randomotp = crypto.randomInt(1000, 9999);
        const expiretime = Date.now() + 5 * 60 * 1000;

        user.forgotPassword = { otp: randomotp, otpExpireTime: expiretime };
        await user.save();

        user_forgot_password_otp_send(user.email, user.name, randomotp);
        return res.status(200).send({ status: true, msg: "Password reset OTP sent to your email", id: user._id });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

export const reset_password = async (req, res) => {
    try {
        const { id } = req.params;
        const { userotp, newPassword } = req.body;
        if (!userotp || !newPassword) return res.status(400).send({ status: false, msg: "Please provide OTP and new password" });

        const user = await user_model.findById(id);
        if (!user) return res.status(404).send({ status: false, msg: "User not found" });

        const { otp, otpExpireTime } = user.forgotPassword || {};
        if (!otp || !otpExpireTime) return res.status(400).send({ status: false, msg: "No password reset request found. Please request OTP first." });
        if (Date.now() > otpExpireTime) return res.status(400).send({ status: false, msg: "OTP expired. Please request a new OTP." });
        if (otp != userotp) return res.status(400).send({ status: false, msg: "Invalid OTP" });

        user.password = newPassword;
        user.forgotPassword = { otp: null, otpExpireTime: null };
        await user.save();

        return res.status(200).send({ status: true, msg: "Password reset successfully! Please log in." });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

export const getWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user_model.findById(id);
        if (!user) return res.status(404).send({ status: false, msg: "User not found" });
        return res.status(200).send({ status: true, wishlist: user.wishlist || [] });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

export const toggleWishlist = async (req, res) => {
    try {
        const { id } = req.params;
        const { car } = req.body;
        if (!car) return res.status(400).send({ status: false, msg: "Car data is required" });

        const user = await user_model.findById(id);
        if (!user) return res.status(404).send({ status: false, msg: "User not found" });

        let wishlist = user.wishlist || [];
        const existingIndex = wishlist.findIndex(item =>
            (item.id && car.id && item.id === car.id) ||
            (item.name && car.name && item.name === car.name) ||
            (item.title && car.title && item.title === car.title)
        );

        let actionMsg = "";
        if (existingIndex > -1) {
            wishlist.splice(existingIndex, 1);
            actionMsg = "Car removed from wishlist";
        } else {
            wishlist.push(car);
            actionMsg = "Car added to wishlist";
        }

        user.wishlist = wishlist;
        await user.save();
        return res.status(200).send({ status: true, msg: actionMsg, wishlist: user.wishlist });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

export const changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) return res.status(400).send({ status: false, msg: "Please provide current and new password" });
        if (newPassword.length < 8) return res.status(400).send({ status: false, msg: "New password must be at least 8 characters" });

        const user = await user_model.findById(id);
        if (!user) return res.status(404).send({ status: false, msg: "User not found" });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).send({ status: false, msg: "Current password is incorrect" });

        user.password = newPassword;
        await user.save();
        return res.status(200).send({ status: true, msg: "Password updated successfully!" });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
}

// User Listings Endpoints
export const getUserListings = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user_model.findById(id);
        if (!user) return res.status(404).send({ status: false, msg: "User not found" });
        return res.status(200).send({ status: true, listings: user.listings || [] });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

export const addUserListing = async (req, res) => {
    try {
        const { id } = req.params;
        const listingData = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...req.body
        };

        const user = await user_model.findById(id);
        if (!user) return res.status(404).send({ status: false, msg: "User not found" });

        user.listings = [listingData, ...(user.listings || [])];
        await user.save();
        return res.status(201).send({ status: true, msg: "Car posted for sale successfully!", listing: listingData, listings: user.listings });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

export const deleteUserListing = async (req, res) => {
    try {
        const { id, listingId } = req.params;
        const user = await user_model.findById(id);
        if (!user) return res.status(404).send({ status: false, msg: "User not found" });

        user.listings = (user.listings || []).filter(item => String(item.id) !== String(listingId));
        await user.save();
        return res.status(200).send({ status: true, msg: "Listing deleted successfully!", listings: user.listings });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

// Test Drives & Offers Endpoints
export const getUserTestDrives = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user_model.findById(id);
        if (!user) return res.status(404).send({ status: false, msg: "User not found" });
        return res.status(200).send({ status: true, testDrives: user.testDrives || [] });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

export const addTestDrive = async (req, res) => {
    try {
        const { id } = req.params;
        const testDriveData = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'Booked',
            ...req.body
        };

        const user = await user_model.findById(id);
        if (!user) return res.status(404).send({ status: false, msg: "User not found" });

        user.testDrives = [testDriveData, ...(user.testDrives || [])];
        await user.save();
        return res.status(201).send({ status: true, msg: "Test drive booked successfully!", testDrives: user.testDrives });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

export const getUserOffers = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await user_model.findById(id);
        if (!user) return res.status(404).send({ status: false, msg: "User not found" });
        return res.status(200).send({ status: true, offers: user.offers || [] });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

export const addOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const offerData = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            status: 'Pending',
            ...req.body
        };

        const user = await user_model.findById(id);
        if (!user) return res.status(404).send({ status: false, msg: "User not found" });

        user.offers = [offerData, ...(user.offers || [])];
        await user.save();
        return res.status(201).send({ status: true, msg: "Offer submitted successfully!", offers: user.offers });
    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};

