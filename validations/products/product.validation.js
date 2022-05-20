import productvalidationschema from "./product.schema.js";

const productvalidationmiddleware=async(req,res,next)=>{
    try{
        const results=productvalidationschema.product.validate(req.body);
        if(results.error)
        {
            res.status(422).json({success:0,message:results.error.details[0],data:null});   
        }
        else
        {
            req.body=results;
            next();
        }
    }
    catch(err)
    {
        res.status(500).json({success:0,message:err.message,data:null});
    }



}