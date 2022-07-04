"use strict";

import mongoose from "mongoose";

const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:[3,"Category Name should have minimum 3 characters."],
        maxlength:[50,"Category Name should have maximum 50 characters."],
        required:[true,"Category Name is required."],
        unique:true
    }
},{ timestamps: true });

const classSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:[3,"Class Name should have minimum 3 characters."],
        maxlength:[50,"Class Name should have maximum 50 characters."],
        required:[true,"Class Name is required."],
        unique:true
    }
},{ timestamps: true });

const occasionSchema=new mongoose.Schema({
    name:{
        type:String,
        minlength:[3,"Occasion Name should have minimum 3 characters."],
        maxlength:[50,"Occasion Name should have maximum 50 characters."],
        required:[true,"Occasion Name is required."],
        unique:true
    }
},{ timestamps: true })

export const productCategory=mongoose.model('Categories',categorySchema);

export const productClass=mongoose.model('Classes',classSchema);

export const productOccasion=mongoose.model('Occasions',occasionSchema);