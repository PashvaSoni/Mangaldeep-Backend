"use strict";

import express from "express";
import { createProduct, deleteProduct, getAllProduct, testing, updateLikesDislikesPopularity, updateProduct } from "../controllers/product.js";
import { paginate } from "../utils/paginateResults.js";
import Product from "../model/product.js";
import { validateBody } from "../utils/bodyValidationMiddleware.js";
import { productValidationschema } from "../validations/product.schema.js";
import { authVerify } from "../utils/create-verify-JWT.js";

const productRouter=express.Router();

productRouter.get('/',paginate(Product),getAllProduct,testing);

productRouter.delete('/:id',deleteProduct)

productRouter.post('/',validateBody(productValidationschema),createProduct);

productRouter.patch('/:id',validateBody(productValidationschema),updateProduct);

productRouter.get('/:o/:id',updateLikesDislikesPopularity);

export default productRouter;