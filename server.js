"use strict";

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import offerRouter from './routes/offer.js'
import productRouter from "./routes/product.js";
import { categoryRouter, classRouter, occasionRouter } from "./routes/common.js";
import userRouter from "./routes/users.js";
import { every24hr } from "./utils/workScheduler.js";
import { securityValidationMiddleware } from "./utils/securityValidationMiddleware.js";

dotenv.config()
const app=express()

app.use(cookieParser());
app.use(bodyParser.json()); // parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true })); // you can parse incoming Request Object if object, with nested objects, or generally any type.


app.use(helmet());

// Setting up cors
var corsOption = {
  origin: "http://localhost:5500", // for now use * but in production allow only specified origin to pass (react-admin.com)
  methods: 'GET,HEAD,PATCH,POST,DELETE',
  credentials: true,
  exposedHeaders: ['x-auth-token']
};
app.use(cors(corsOption));


// the below code helps to remove CORS error... CORS errors comes when the API is hosted on different server
// app.use((req,res,next)=>{
//     res.header('Access-Control-Allow-Origin',"*"); // changes this for security purpose * will allow anyone to access this API
//     res.header("Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//     );

//     // server sometimes request for OPTION method to check which methods are supported by this API, So we append the list of methods in the response header which we support
//     if(req.method==='OPTIONS'){
//         res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({}) // we return empty json becuase OPTION request is just to check which methods API supports
//     }
//     next();
// })

every24hr.start();   //this code is running continuously at every 24 hours

mongoose.connect(process.env.DATABASE_URL)
const db=mongoose.connection
db.on('error',(error)=>{console.error(error)})
db.once('open',()=>console.log("connected to DB")) // this runs when db is connected 

app.use('/offers',securityValidationMiddleware,offerRouter);
app.use('/products',productRouter);
app.use('/categories',categoryRouter);
app.use('/classes',classRouter);
app.use('/occasions',occasionRouter);
app.use('/users',userRouter);

// page not found error handling  middleware
app.use("*", (req, res) => {
    res.status(404).json({success:0,message:"We didn't find what you are looking for !",data:null});    
});

app.listen(3000,()=>{console.log("server started at port")})