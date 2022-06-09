import { productCategory, productClass, productOccasion } from "../model/common.js";
import mongoose from "mongoose";
// ------------------------------- Category Controllers ---------------------------------

// get all category
export const getAllCategories= async(req,res)=>{
    try{
        const results= await productCategory.find();
        res.status(200).json({success:1,message:"Product Categories Retrieved Successfully.",data:results});
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
        if(err.name === 'MongoServerError' && err.code === 11000)
        {
            res.status(406).json({success:0,message:"Product Category with the given name already exist."});
        }
        else
        {
            res.status(500).json({success:0,message:err.message,data:null});
        }
    }
}

// update category by ID
export const updateCategory=async(req,res)=>{
    try{
        if (mongoose.isValidObjectId(req.params.id)) // checking if the ID passed is valid ID
        {
            const temp=await productCategory.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
            res.status(200).json({success:1,message:"Product Category updated successfully."});
        }
        else
        {
            res.status(400).json({success:0,message:"Invalid Product Category-ID.",data:null});
        }
    }
    catch(err)
    {
        if(err.name === 'MongoServerError' && err.code === 11000)
        {
            res.status(406).json({success:0,message:"Product Category with the given name already exist."});
        }
        else
        {
            res.status(500).json({success:0,message:err.message,data:null});
        }
    }
}

// ------------------------------- Class Controllers ---------------------------------

// get all classes
export const getAllClasses= async(req,res)=>{
    try{
        const results= await productClass.find();
        res.status(200).json({success:1,message:"Product Classes Retrieved Successfully.",data:results});
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
        if(err.name === 'MongoServerError' && err.code === 11000)
        {
            res.status(406).json({success:0,message:"Product Class with the given name already exist."});
        }
        else
        {
            res.status(500).json({success:0,message:err.message,data:null});
        }
    }
}

// update class by ID
export const updateClass=async(req,res)=>{
    try{
        if (mongoose.isValidObjectId(req.params.id)) // checking if the ID passed is valid ID
        {
            const temp=await productClass.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
            res.status(200).json({success:1,message:"Product Class updated successfully."});
        }
        else
        {
            res.status(400).json({success:0,message:"Invalid Product Class-ID.",data:null});
        }
    }
    catch(err)
    {
        if(err.name === 'MongoServerError' && err.code === 11000)
        {
            res.status(406).json({success:0,message:"Product Class with the given name already exist."});
        }
        else
        {
            res.status(500).json({success:0,message:err.message,data:null});
        }
    }
}

// ------------------------------- Occasion Controllers ---------------------------------

// get all occasions
export const getAllOccasions= async(req,res)=>{
    try{
        const results= await productOccasion.find();
        res.status(200).json({success:1,message:"Product Occassions Retrieved Successfully.",data:results});
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
        if(err.name === 'MongoServerError' && err.code === 11000)
        {
            res.status(406).json({success:0,message:"Product Occasion with the given name already exist."});
        }
        else
        {
            res.status(500).json({success:0,message:err.message,data:null});
        }
    }
}

// update occassion by ID
export const updateOccassion=async(req,res)=>{
    try{
        if (mongoose.isValidObjectId(req.params.id)) // checking if the ID passed is valid ID
        {
            const temp=await productOccasion.findByIdAndUpdate(req.params.id,{name:req.body.name},{new:true});
            res.status(200).json({success:1,message:"Product Occassion updated successfully."});
        }
        else
        {
            res.status(400).json({success:0,message:"Invalid Product Occassion-ID.",data:null});
        }
    }
    catch(err)
    {
        if(err.name === 'MongoServerError' && err.code === 11000)
        {
            res.status(406).json({success:0,message:"Product Occassion with the given name already exist."});
        }
        else
        {
            res.status(500).json({success:0,message:err.message,data:null});
        }
    }
}