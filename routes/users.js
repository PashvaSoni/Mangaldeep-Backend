import express from "express";
import { createUser, loginUser, sendOTP, verifyOTP } from "../controllers/users.js";
import { validateBody } from "../utils/bodyValidationMiddleware.js";
import { userValidationSchema } from "../validations/user.schema.js";
const userRouter = express.Router();

//create new user
userRouter.post('/signup',validateBody(userValidationSchema),createUser);
userRouter.post('/signin',loginUser);
userRouter.post('/signin/sendOTP',sendOTP);
userRouter.post('/signin/verifyOTP',verifyOTP);

export default userRouter;