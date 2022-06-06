import express from "express";
import { createProduct, deleteProduct, getAllProduct, updateLikesDislikesPopularity, updateProduct } from "../controllers/product.js";
import { paginate } from "../extra/middleware.js";
import Product from "../model/product.js";
import productValidationMiddleware from "../validations/products/product.validation.js";

const productRouter=express.Router();

productRouter.get('/',paginate(Product),getAllProduct);

productRouter.delete('/:id',deleteProduct)

productRouter.post('/',productValidationMiddleware,createProduct);

productRouter.patch('/:id',productValidationMiddleware,updateProduct);

productRouter.get('/:o/:id',updateLikesDislikesPopularity);

export default productRouter;