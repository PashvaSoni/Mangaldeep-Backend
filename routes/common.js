"use strict";

import express from "express";
import { createCategory,createClass,createOccasion, getAllCategories, getAllClasses, getAllOccasions, updateCategory, updateClass, updateOccassion } from "../controllers/common.js";
import { validateBody } from "../utils/bodyValidationMiddleware.js";
import { categoryValidationSchema, classValidationSchema, ocassionValidationSchema } from "../validations/common.schema.js";

// ------------------------------- Category Routes ----------------------------------------
export const categoryRouter = express.Router();

// get all categories
categoryRouter.get('/',getAllCategories);

// create new category route
categoryRouter.post('/',validateBody(categoryValidationSchema),createCategory);

//update existing category using ID
categoryRouter.put('/:id',validateBody(categoryValidationSchema),updateCategory);

// ------------------------------- Class Routes ----------------------------------------
export const classRouter = express.Router();

// get all classes
classRouter.get('/',getAllClasses);

//create new class route
classRouter.post('/',validateBody(classValidationSchema),createClass);

//update existing class using ID
classRouter.post('/:id',validateBody(classValidationSchema),updateClass);


// ------------------------------- Occasion Routes ----------------------------------------
export const occasionRouter = express.Router();

// get all occasions
occasionRouter.get('/',getAllOccasions);

//create new occasion route
occasionRouter.post('/',validateBody(ocassionValidationSchema),createOccasion);

//update existing occassion using ID
occasionRouter.post('/:id',validateBody(ocassionValidationSchema),updateOccassion);