import Offer from'../model/offer.js';
import mongoose from 'mongoose';

 export const getAllOffers= async(req,res) =>{
    try{
        const offers=await Offer.find()
        res.status(200).json({success:1,message:"Offers retrieved successfully",data:offers})
    }
    catch(err){
        res.status(500).json({success:0,message:err.message,data:null})
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
        res.status(201).json({success:1,message:"Offer created successfully",data:newOffer})
    } catch(err){
        res.status(400).json({success:0,message:err.message,data:null})
    }
 };

 export const deleteOffer=async(req,res)=>{
    let tempoffer
    try{
        if(mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            tempoffer=await Offer.findById(req.params.id); // checking if offer with this id exist 
            if(tempoffer==null)
            {
                res.status(404).json({success:0,message:"No offer with this ID available"});
            }
            else
            {
                await tempoffer.remove();
                res.status(200).json({success:1,message:"Offer deleted successfully",data:null})
            }
        }
        else
        {
            res.status(400).json({succes:0,message:"Invalid Offer-ID",data:null});
        }
    }
    catch(err){
        res.status(500).json({succes:0,message:err.message,data:null})
    }


 };