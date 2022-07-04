"use strict";
export const securityValidationMiddleware=async(req,res,next)=>{
    try{
        
        //checking content-type
        

        //if everything goes well 
        next();
    }
    catch(err)
    {
        return res.status(500).json({success:0,message:err.message,data:null});
    }
}