import productvalidationschema from "./product.schema.js";

const productValidationMiddleware=async(req,res,next)=>{
    try{
        const results=productvalidationschema.product.validate(req.body);
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

export default productValidationMiddleware;