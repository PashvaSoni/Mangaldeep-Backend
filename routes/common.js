import express from "express";
import { createCategory,createClass,createOccasion, getAllCategories, getAllClasses, getAllOccasions } from "../controllers/common.js";
import { categoryValidationMiddleware, classValidationMiddleware, occasionValidationMiddleware } from "../validations/common/common.validation.js";

// ------------------------------- Category Routes ----------------------------------------
export const categoryRouter = express.Router();

// get all categories
categoryRouter.get('/',getAllCategories);

// create new category route
categoryRouter.post('/',categoryValidationMiddleware,createCategory);

// ------------------------------- Class Routes ----------------------------------------
export const classRouter = express.Router();

// get all classes
classRouter.get('/',getAllClasses);

//create new class route
classRouter.post('/',classValidationMiddleware,createClass);


// ------------------------------- Occasion Routes ----------------------------------------
export const occasionRouter = express.Router();

// get all occasions
occasionRouter.get('/',getAllOccasions);

//create new occasion route
occasionRouter.post('/',occasionValidationMiddleware,createOccasion);