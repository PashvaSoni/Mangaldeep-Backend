import commonschema from "./common.schema.js";


//---------------------------- Category Valdidation Middleware ----------------------------------
export const categoryValidationMiddleware=async(req,res,next)=>{
    try{
        const result=commonschema.category.validate(req.body);
        if(result.error)
        {
            res.status(422).json({success:0,message:result.error.details[0].message.replaceAll('\"',''),data:null});
        }
        else{
            req.body=result.value;
            next();
        }
    }
    catch(err){
        res.status(500).json({success:0,message:err.message,data:null});
    }
}


// ------------------------------------ Class Validation Middleware ----------------------------------  
export const classValidationMiddleware=async(req,res,next)=>{
    try{
        const result=commonschema.class.validate(req.body);
        if(result.error)
        {
            res.status(422).json({success:0,message:result.error.details[0].message.replaceAll('\"',''),data:null});
        }
        else{
            req.body=result.value;
            next();
        }
    }
    catch(err){
        res.status(500).json({success:0,message:err.message,data:null});
    }
}



// ----------------------------------- Occasion Validation Middleware -------------------------------
export const occasionValidationMiddleware=async(req,res,next)=>{
    try{
        const result=commonschema.ocassion.validate(req.body);
        if(result.error)
        {
            res.status(422).json({success:0,message:result.error.details[0].message.replaceAll('\"',''),data:null});
        }
        else{
            req.body=result.value;
            next();
        }
    }
    catch(err){
        res.status(500).json({success:0,message:err.message,data:null});
    }
}