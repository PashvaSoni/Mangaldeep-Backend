import Offer from'../model/offer.js';
import mongoose from 'mongoose';

// get all the offers
 export const getAllOffers= async(req,res) =>{
    try{
        const offers=await Offer.find()
        res.status(200).json({success:1,message:"Offers retrieved successfully",data:offers})
    }
    catch(err){
        res.status(500).json({success:0,message:err.message,data:null})
    }
 };

// create a new offer
 export const createOffer=async(req,res)=>{
    const offer=new Offer({
        title:req.body.title,
        description:req.body.description,
        imageurl:req.body.imageurl,
        targetlink:req.body.targetlink,
        startdate:req.body.startdate,
        enddate:req.body.enddate
    })
    try{
        const newOffer=await offer.save()
        res.status(201).json({success:1,message:"Offer created successfully",data:newOffer})
    } catch(err){
        res.status(400).json({success:0,message:err.message,data:null})
    }
 };

 // delete offer by ID
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

  // check if date passed by user is valid date object
  const isDate = (date) => {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }

// get offers by date passed
 export const getOfferByDate = async(req,res)=>{
     let req_date=req.params.sdate;
     if( isDate(req_date) || req_date.toLowerCase()=="today")
     {
        let tempdate=req_date.toLowerCase()=="today"?new Date().toISOString():new Date(req_date);
        try{
            let stdate=new Date(new Date(tempdate).getTime() - (24*60*60*1000));
            let endate=new Date(new Date(tempdate).getTime() + (24*60*60*1000));
            const offers=await Offer.find({
                startdate:{
                    $gte:stdate,
                    $lte:endate
                }
            })
            res.status(200).json({success:1,message:"Offers Retrieved successfully",data:offers});

        }
        catch(err)
        {
            res.status(500).json({success:0,message:err.message,data:null});
        }
     }
     else
     {
         // not valid date or not today
         res.status(400).json({message:"Enter Valid Date in YYYY-MM-DD format"});
     }
 }