import express from "express";
import { createProduct } from "../controllers/product.js";
const productRouter=express.Router();

// productRouter.get('/')

productRouter.post('/',createProduct);

export default productRouter;