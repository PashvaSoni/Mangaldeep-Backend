import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"User's name is required !"],
        minlength:[4,"User's name should be minimum 4 characters long !"],
        maxlength:[50,"User's name should be maximum 50 characters long !"]
    },
    email:{
        type:String,
    },
    phonenumber:{
        type:String,
        unique:true,
        required:[true,"User's phone number is required !"]
    },
    dob:{
        type:Date
    },
    password:{
        type:String,
        required:[true,"User's password is required !"]
    },
    likedproducts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Products",
    },
    wishlistedproducts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Products",
    },
    dislikedproducts:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Products"
    },
    registrationdate:{
        type:Date,
        default:Date
    },
    orders:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:"Orders"
    }
});

const Users=mongoose.model('Users',userSchema);
export default Users;