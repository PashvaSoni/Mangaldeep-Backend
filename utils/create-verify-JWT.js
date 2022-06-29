import jwt from 'jsonwebtoken';
import { decryptData, encryptData } from './helperFunctions.js';

export const signJWT=async(payload,secretkey,expiresIn)=>{
    // signs JWT and encryt it
    try{
        const temp=jwt.sign(payload,secretkey,{algorithm:'HS256',expiresIn:expiresIn});
        console.log(temp);
        console.log("--");
        return await encryptData(temp);
    }
    catch(err)
    {
        err.name="JWT Signing Error";
        throw {name:"JWT Signing Error",message:err};
    }
}

export const verifyJWT=async(data,secretkey)=>{
    //decrypt it verify JWT
    try{
        //decrypt token first
        console.log(await decryptData(data));
        return jwt.verify(await decryptData(data),secretkey,function(error,decode){
            if(error)
            {
                return {success:0,value:null}
            }
            else
            {
                return {success:1,value:decode};
            }
        });
    }catch(err)
    {
        err.name="JWT Verifying Error";
        throw {name:"JWT Verifying Error",message:err};
    }
}

export const decodeJwt=async()=>{
    //function is to decrypt the encrypted payload and return original payload back
}

export const authVerify=async(req,res,next)=>{
    // middleware
    //https://blog.devgenius.io/simplified-implementation-of-access-and-refresh-tokens-on-a-node-express-mongodb-backend-server-2b251975c21f
    try{
        let act_cookie= req.cookies.act;
        if(!act_cookie)
        {
            return res.status(403).json({success:0,message:"Session Timeout..",data:null});
        }
        else
        {
            console.log("entered")
            // check if refresh token is black-listed
            let temp=(await verifyJWT(act_cookie,process.env.JWT_ACCESSTOKEN_KEY));
            if(temp.success)
            {
                console.log("success",temp.decode);
            }
            else
            {
                console.log("fucked");
            }      
            console.log("leaving");     
            // next();
        }
    }
    catch(err)
    {
        return res.status(500).json({success:0,message:err,data:null});
    }

}