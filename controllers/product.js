import Product from "../model/product.js";
import mongoose from "mongoose";

// get all the products
export const getAllProduct=async(req,res)=>{
    try{
        res.status(200).json({success:1,message:"Products Retrieved Successfully",data:res.paginatedResult})
    }
    catch(err)
    {
        res.status(500).json({success:0,message:err.message,data:null});
    }
}


//delete product by ID
export const deleteProduct=async(req,res)=>{
    let tempoffer
    try{
        if(mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            tempoffer=await Product.findById(req.params.id); // checking if offer with this id exist 
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
}


//create new product
export const createProduct=async(req,res)=>{
    try{
        const temp= new Product({
            name:req.body.name,
            description:req.body.description,
            imageurl:req.body.imageurl,
            likes:req.body.likes,
            dislikes:req.body.deslikes,
            popularity:req.body.popularity,
            targetgender:req.body.targetgender,
            registrationdate:req.body.date,
            metal:req.body.metal,
            metalweight:req.body.metalweight,
            grossweight:req.body.grossweight,
            metalpurity:req.body.metalpurity,
            makingcharge:req.body.makingcharge,
            category:req.body.category,
            class:req.body.class,
            occasion:req.body.occasion
        });
        const newProduct=await temp.save();
        res.status(200).json({success:1,message:"Successfully created product",data:newProduct});
    }
    catch(err)
    {
        res.status(500).json({success:0,message:err.message,data:null})
    }
}
