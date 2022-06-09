import express from "express";
import { createUser } from "../controllers/users.js";
import userValidationMiddleware from "../validations/users/user.validation.js";
const userRouter = express.Router();

//create new user
userRouter.post('/',userValidationMiddleware,createUser);

export default userRouter;