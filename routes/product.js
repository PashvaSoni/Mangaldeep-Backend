import express from "express";
import { createProduct } from "../controllers/product.js";
import productvalidationmiddleware from "../validations/products/product.validation.js";

const productRouter=express.Router();

// productRouter.get('/')

productRouter.post('/',productvalidationmiddleware,createProduct);

export default productRouter;