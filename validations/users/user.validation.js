import userValidationSchema from "./user.schema.js";

const userValidationMiddleware=async(req,res,next)=>{
    try{
        const results=userValidationSchema.validate(req.body);
        if(results.error)
        {
            res.status(422).json({success:0,message:results.error.details[0].message.replaceAll('\"',''),data:null});   
        }
        else
        {
            req.body=results.value;
            next();
        }
    }
    catch(err)
    {
        res.status(500).json({success:0,message:err.message,data:null});
    }
}

export default userValidationMiddleware;