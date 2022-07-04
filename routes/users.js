"use strict";

import express from "express";
import { createUser, loginUser, logoutUser, sendOTP, verifyOTP } from "../controllers/users.js";
import { validateBody } from "../utils/bodyValidationMiddleware.js";
import { createUserValidationSchema, loginUserValidationSchema } from "../validations/user.schema.js";
const userRouter = express.Router();

//create new user
userRouter.post('/signup',validateBody(createUserValidationSchema),createUser);
userRouter.post('/signin',validateBody(loginUserValidationSchema),loginUser);
userRouter.post('/signin/sendOTP',sendOTP);
userRouter.post('/signin/verifyOTP',verifyOTP)
userRouter.post('/logout',logoutUser);

export default userRouter;