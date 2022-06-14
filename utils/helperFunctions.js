import bcrypt from 'bcrypt';
import optGenerator from 'otp-generator'

// for generating hash of passwords when user signups
export const generateHash=async(pass)=>{
    try{
        let hashPassword=await bcrypt.hash(pass,12);
        return hashPassword;
    }
    catch(err){
        throw {name:"Generating Hash Error",message:err};
    }
}

// for generating the random OTP
export const generateOTP=async()=>{
    try{
        let otp=optGenerator.generate(6,{digits:true,upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false});
        return otp;
    }catch(err){
        throw {name:"Generating OTP Error",message:err};
    }
}
