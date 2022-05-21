import express from "express";
import { createCategory,createClass,createOccasion } from "../controllers/common.js";

// ------------------------------- Category Routes ----------------------------------------
export const categoryRouter = express.Router();

// create new category route
categoryRouter.post('/',createCategory);

// ------------------------------- Class Routes ----------------------------------------
export const classRouter = express.Router();

//create new class route
classRouter.post('/',createClass);


// ------------------------------- Occasion Routes ----------------------------------------
export const occasionRouter = express.Router();

//create new occasion route
occasionRouter.post('/',createOccasion);