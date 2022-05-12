import Offer from'../model/offer.js';

 export const getAllOffers= async(req,res) =>{
    try{
        const offers=await Offer.find()
        res.status(200).json(offers)
    }
    catch(err){
        res.status(200).json({message:err.message})
    }
 };

 export const createOffer=async(req,res)=>{
    const offer=new Offer({
        title:req.body.title,
        description:req.body.description,
        imageurl:req.body.imageurl,
        enddate:req.body.enddate
    })
    try{
        const newOffer=await offer.save()
        res.status(201).json({message:"offer created successfully",offer:newOffer})
    } catch(err){
        res.status(400).json({message:err.message})
    }
 };