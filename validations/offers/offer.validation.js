import offerValidationSchema from './offer.schema.js';


const OfferValidationMiddleware= async(req,res,next)=>{
    const value =await offerValidationSchema.offer.validate(req.body);
    if(value.error)
    {
        res.status(400).json({success:0,message:value.error.details[0].message.replaceAll('\"',''),data:null});
    }
    else{
        next();
    }
};

export default OfferValidationMiddleware;

