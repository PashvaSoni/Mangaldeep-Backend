import bcrypt from 'bcrypt';
import crypto from 'crypto';
import dotenv from "dotenv";
import optGenerator from 'otp-generator'

dotenv.config()

// for generating hash of passwords when user signups
export const generateHash=async(pass)=>{
    try{
        let hashPassword=await bcrypt.hash(pass,12);
        return hashPassword;
    }
    catch(err){
        err.name="Generating Hash Error";
        throw {name:"Generating Hash Error",message:err};
    }
}

export const compareHash=async(pass,hash)=>{
    try{
        if(await bcrypt.compare(pass,hash))
        {
            return true; // true if password matches
        }
        else
        {
            return false; // false if password doesnot matches
        }
    }
    catch(err)
    {
        err.name="Compare Hash Error";
        throw {name:"Compare Hash Error",message:err};
    }
}

// for generating the random OTP
export const generateOTP=async()=>{
    try{
        let otp=optGenerator.generate(6,{digits:true,upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});
        return otp;
    }catch(err){
        err.name="Generating OTP Error";
        throw {name:"Generating OTP Error",message:err};
    }
}

// for encrypting any data (JSON or Plain-Text) // link : https://www.section.io/engineering-education/data-encryption-and-decryption-in-node-js-using-crypto/
export const encryptData=async(data)=>{
    try
    {
        // first we need to create a cipher which will encrypt our data... it requires 3 things 1) Algorith, 2) Secret_Key, 3) Initail_Vector
        const cipher=crypto.createCipheriv(process.env.ENCRYPT_DATA_ALGORITHM,process.env.ENCRYPT_DATA_KEY,process.env.ENCRYPT_DATA_INIT_VECTOR);
        // now encrypting the data
        let encryptedData = cipher.update(JSON.stringify(data), "utf-8", "hex");
        encryptedData += cipher.final("hex");
        return encryptedData;
    }
    catch(err)
    {
        err.name="Encrypting Data Error";
        throw {name:"Encrypting Data Error",message:err};
    }
}

export const decryptData=async(data)=>{
    try{
        // first we need to create a decipher which will encrypt our data... it requires 3 things 1) Algorith, 2) Secret_Key, 3) Initail_Vector
        const decipher = crypto.createDecipheriv(process.env.ENCRYPT_DATA_ALGORITHM,process.env.ENCRYPT_DATA_KEY,process.env.ENCRYPT_DATA_INIT_VECTOR);
        // now decrypting the data
        let decryptedData = decipher.update(data, "hex", "utf-8");
        decryptedData += decipher.final("utf8");
        return decryptedData;
    }
    catch(err)
    {
        err.name="Decrypting Data Error";
        throw {name:"Decrypting Data Error",message:err};
    }

}

export const getRandomHex=async(size=32)=>{
    try{
        return crypto.randomBytes(size).toString('hex');
    }catch(err)
    {
        err.name="Random Hex Generating Error";
        throw {name:"Random Hex Generating Error",message:err};
    }
}
