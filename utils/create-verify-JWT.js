"use strict";

import jwt from 'jsonwebtoken';
import { decryptData, encryptData } from './helperFunctions.js';

export const signJWT = async (payload, secretkey, expiresIn) => {
    // signs JWT and encryt it
    try {
        return await encryptData(jwt.sign(payload, secretkey, { algorithm: 'HS256', expiresIn: expiresIn }));
    }
    catch (err) {
        err.name = "JWT Signing Error";
        throw { name: "JWT Signing Error", message: err };
    }
}

export const verifyJWT = async (data, secretkey) => {
    //decrypt it verify JWT
    try {
        //decrypt token first
        return jwt.verify(await (await decryptData(data)).replaceAll(`"`, ''), secretkey, function (error, decode) {
            if (error) {
                return { success: 0, value: error.message }
            }
            else {
                return { success: 1, value: decode };
            }
        });
    } catch (err) {
        err.name = "JWT Verifying Error";
        throw { name: "JWT Verifying Error", message: err };
    }
}

export const authVerify = async (req, res, next) => {
    // middleware
    try {
        const act_cookie = req.cookies.act;
        if (!act_cookie) {
            const rct_cookie = req.cookies.rct;
            if (!rct_cookie) {
                return res.status(403).json({ success: 0, message: "Unauthorized access", data: null });
            }
            else {
                const temp = await (verifyJWT(rct_cookie, process.env.JWT_REFRESHTOKEN_KEY))
                // check if refresh token is black-listed
                if (temp.success) {
                    req.decode = temp.value;
                    const payload = { id: temp.value.id };
                    const accessToken = await signJWT(payload, process.env.JWT_ACCESSTOKEN_KEY, 18000) // access token is valid for 30 mins
                    res.cookie(`act`, `${accessToken}`, {
                        maxAge: 18000, // access token is valid for 30 mins only
                        secure:true, // so that cookies are sent only if domain is HTTPS
                        httpOnly: true, // so that JS cannot access it 
                        sameSite: true, // so that cookies are sent to our domain only
                    })
                    next();
                }
                else {
                    return res.status(401).json({ success: 0, message: "Unauthorized access", data: null });
                }
            }
        }
        else {
            const temp = (await verifyJWT(act_cookie, process.env.JWT_ACCESSTOKEN_KEY));
            //check if it contains refresh token, if not than mark it as unauthorized
            if (temp.success) {
                req.decode = temp.value;
                next();
            }
            else {
                return res.status(401).json({ success: 0, message: "Unauthorized access", data: null });
            }
        }
    }
    catch (err) {
        return res.status(500).json({ success: 0, message: err, data: null });
    }

}