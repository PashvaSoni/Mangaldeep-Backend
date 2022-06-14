import crypto from 'crypto';
import dotenv from 'dotenv';

import { generateHash, generateOTP} from "../utils/helperFunctions.js";
import { sendToEmail } from '../utils/sendEmail.js';
import { sendToPhone } from '../utils/sendSMS.js';
import Users from "../model/users.js";

dotenv.config();

function checkOTP(phone, otphash, otp) {
    // Seperate Hash value and expires from the hash returned from the user
    let [hashValue, expires] = otphash.split(".");
    // Check if expiry time has passed
    let now = Date.now();
    if (now > parseInt(expires)) return { success: 0, message: "OTP expired please try again." };
    // Calculate new hash with the same key and the same algorithm
    let data = `${phone}.${otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256", process.env.OTP_SENDING_KEY).update(data).digest("hex");
    // Match the hashes
    if (newCalculatedHash === hashValue) {
        return { success: 1, message: "OTP verified." };
    }
    return { success: 0, message: "Invalid Phone No. OR OTP provided !" };
}


//create new user
export const createUser = async (req, res) => {
    try {
        let hash = await generateHash(req.body.password);
        req.body.password = hash;
        const tempUser = new Users(req.body);
        const newUser = await tempUser.save()
        res.status(200).json({ success: 1, message: "User Created Successfully.", data: newUser });
    }
    catch (err) {
        if (err.name === 'MongoServerError' && err.code === 11000) {
            res.status(406).json({ success: 0, message: "User is already registered." });
        }
        else {
            res.status(500).json({ success: 0, message: err.message, data: null });
        }
    }
}

//get user login
export const sendOTP = async (req, res) => {
    try {
        const { phonenumber } = req.body;
        const tempUser = await Users.findOne({ phonenumber: phonenumber });
        if (tempUser != null) {
            // if user with the given phone number exist

            const otp = await generateOTP();    // generating otp
            const expires = Date.now() + 2 * 60 * 1000;   // otp is valid for 2 mins from now
            const cryptHash = crypto.createHmac("sha256", process.env.OTP_SENDING_KEY).update(`${tempUser.phonenumber}.${otp}.${expires}`).digest("hex");  // creating SHA256 hash of the phonenumber + '.' + otp + '.' + expires  // dot is for splitting
            const fullHash = `${cryptHash}.${expires}`; // Hash.expires, format to send to the user

            // sending otp to email if user email exist
            if (tempUser.email != undefined || tempUser.email != null) {
                sendToEmail(tempUser.email, otp);
            }

            // sending otp to phone number
            sendToPhone(tempUser.phonenumber, otp);

            res.status(200).json({ success: 1, message: "Found user", data: { otphash: fullHash } });
        }
        else {

            // if no user with given phone number exist
            res.status(404).json({ success: 0, message: "User does not exist", data: null });

        }
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err.message, data: null });
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { phonenumber, otphash, otp } = req.body;
        const checkObj = checkOTP(phonenumber, otphash, otp);
        if (checkObj.success) {
            // start from here
            res.status(200).json({ phonenumber: phonenumber, otphash: otphash, otp: otp });
        }
        else {
            return res.status(401).json({ success: 0, message: checkObj.message, data: null });
        }
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err.message, data: null });
    }
}