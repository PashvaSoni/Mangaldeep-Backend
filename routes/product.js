import express from "express";
import { createProduct, getAllProduct } from "../controllers/product.js";
import { paginate } from "../extra/middleware.js";
import Product from "../model/product.js";
import productvalidationmiddleware from "../validations/products/product.validation.js";

const productRouter=express.Router();

productRouter.get('/',paginate(Product),getAllProduct);


productRouter.post('/',productvalidationmiddleware,createProduct);

export default productRouter;