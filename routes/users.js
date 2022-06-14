import express from "express";
import { createUser, sendOTP, verifyOTP } from "../controllers/users.js";
import userValidationMiddleware from "../validations/users/user.validation.js";
const userRouter = express.Router();

//create new user
userRouter.post('/signup',userValidationMiddleware,createUser);
userRouter.post('/signin/sendOTP',sendOTP);
userRouter.post('/signin/verifyOTP',verifyOTP);

export default userRouter;