"use strict";

export function validateBody(joiSchema){
    return async(req,res,next)=>{
        try{
            const result =await joiSchema.validate(req.body);
            if(result.error)
            {
                res.status(422).json({success:0,message:result.error.details[0].message.replaceAll('\"',''),data:null});
            }
            else{
                req.body=result.value;
                next();
            }
        }
        catch(err)
        {
            res.status(500).json({success:0,message:err.message,data:null});
        }
    }
}