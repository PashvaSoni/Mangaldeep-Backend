import Product from "../model/product.js";
import mongoose from "mongoose";

// get all the products
export const getAllProduct = async (req, res) => {
    try {
        res.status(200).json({ success: 1, message: "Products Retrieved Successfully", data: res.paginatedResult })
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err.message, data: null });
    }
}

//update product by ID
export const updateProduct = async (req, res) => {
    try {
        let tempproduct
        if (mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            tempproduct = await Product.findById(req.params.id); // checking if offer with this id exist 
            if (tempproduct == null) {
                res.status(404).json({ success: 0, message: "No Product with this ID available" });
            }
            else {
                tempproduct.name=req.body.name,
                tempproduct.description=req.body.description
                tempproduct.imageurl=req.body.imageurl
                // tempproduct.likes=req.body.likes
                // tempproduct.dislikes=req.body.deslikes          // no one can directly update 
                // tempproduct.popularity=req.body.popularity
                // tempproduct.registrationdate=req.body.date
                tempproduct.targetgender=req.body.targetgender
                tempproduct.metal=req.body.metal
                tempproduct.metalweight=req.body.metalweight
                tempproduct.grossweight=req.body.grossweight
                tempproduct.metalpurity=req.body.metalpurity
                tempproduct.makingcharge=req.body.makingcharge
                tempproduct.category=req.body.category
                tempproduct.class=req.body.class
                tempproduct.occasion=req.body.occasion
                const result = await tempproduct.save();
                res.status(200).json({ success: 1, message: "Product Updated successfully", data: result })
            }
        }
        else {
            res.status(400).json({ succes: 0, message: "Invalid Product-ID", data: null });
        }
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err.message, data: null });
    }
}


//delete product by ID
export const deleteProduct = async (req, res) => {
    let tempproduct
    try {
        if (mongoose.isValidObjectId(req.params.id)) // checking if the user passed ID is valid
        {
            tempproduct = await Product.findById(req.params.id); // checking if offer with this id exist 
            if (tempproduct == null) {
                res.status(404).json({ success: 0, message: "No Product with this ID available" });
            }
            else {
                await tempproduct.remove();
                res.status(200).json({ success: 1, message: "Product deleted successfully", data: null })
            }
        }
        else {
            res.status(400).json({ succes: 0, message: "Invalid Offer-ID", data: null });
        }
    }
    catch (err) {
        res.status(500).json({ succes: 0, message: err.message, data: null })
    }
}


//create new product
export const createProduct = async (req, res) => {
    try {
        const temp = new Product({
            name: req.body.name,
            description: req.body.description,
            imageurl: req.body.imageurl,
            likes: req.body.likes,
            dislikes: req.body.deslikes,
            popularity: req.body.popularity,
            targetgender: req.body.targetgender,
            registrationdate: req.body.date,
            metal: req.body.metal,
            metalweight: req.body.metalweight,
            grossweight: req.body.grossweight,
            metalpurity: req.body.metalpurity,
            makingcharge: req.body.makingcharge,
            category: req.body.category,
            class: req.body.class,
            occasion: req.body.occasion
        });
        const newProduct = await temp.save();
        res.status(200).json({ success: 1, message: "Successfully created product", data: newProduct });
    }
    catch (err) {
        res.status(500).json({ success: 0, message: err.message, data: null })
    }
}
