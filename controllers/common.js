import { productCategory, productClass, productOccasion } from "../model/common.js";

// ------------------------------- Category Controllers ---------------------------------

// get all category
export const getAllCategories= async(req,res)=>{
    try{
        const results= await productCategory.find();
        res.status(200).json({success:1,message:"Categories Retrieved Successfully",data:results});
    }
    catch(err)
    {
        res.status(500).json({success:0,message:err.message,data:null});
    }
}


// create new category
export const createCategory =async(req,res)=>{
    try{
        const temp=new productCategory({
            name:req.body.name
        })
        const newCategory=await temp.save();
        res.status(200).json({success:0,message:"Successfully created new product category.",data:newCategory});
    }
    catch(err)
    {
        res.status(500).json({success:0,message:err.message,data:null});
    }
}

// ------------------------------- Class Controllers ---------------------------------

// get all classes
export const getAllClasses= async(req,res)=>{
    try{
        const results= await productClass.find();
        res.status(200).json({success:1,message:"Classes Retrieved Successfully",data:results});
    }
    catch(err)
    {
        res.status(500).json({success:0,message:err.message,data:null});
    }
}

// create new class
export const createClass =async(req,res)=>{
    try{
        const temp=new productClass({
            name:req.body.name
        })
        const newClass=await temp.save();
        res.status(200).json({success:0,message:"Successfully created new product class.",data:newClass});
    }
    catch(err)
    {
        res.status(500).json({success:0,message:err.message,data:null});
    }
}

// ------------------------------- Occasion Controllers ---------------------------------

// get all occasions
export const getAllOccasions= async(req,res)=>{
    try{
        const results= await productOccasion.find();
        res.status(200).json({success:1,message:"Categories Retrieved Successfully",data:results});
    }
    catch(err)
    {
        res.status(500).json({success:0,message:err.message,data:null});
    }
}

// create new occasion
export const createOccasion =async(req,res)=>{
    try{
        const temp=new productOccasion({
            name:req.body.name
        })
        const newOccasion=await temp.save();
        res.status(200).json({success:0,message:"Successfully created new product occasion.",data:newOccasion});
    }
    catch(err)
    {
        res.status(500).json({success:0,message:err.message,data:null});
    }
}