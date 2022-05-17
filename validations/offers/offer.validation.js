import offerValidationSchema from './offer.schema.js';


const OfferValidationMiddleware= async(req,res,next)=>{
    const result =offerValidationSchema.offer.validate(req.body);
    if(result.error)
    {
        res.status(422).json({success:0,message:result.error.details[0].message.replaceAll('\"',''),data:null});
    }
    else{
        req.body=result.value;
        next();
    }
};

export default OfferValidationMiddleware;

