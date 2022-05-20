import { required } from "@hapi/joi/lib/base";
import mongoose, { SchemaTypes } from "mongoose";
import {productCategory,productClass,productOccasion} from './common.js'
function greaterThanZero(val) {
    return val.length <=0;
  }

const GENDER_ENUM = ['men','women','kids','unisex'];
const METAL_ENUM = ['gold','silver','platinum','imitation'];
const METAL_PURITY_ENUM = ['18KT','22KT','24KT','100%'];

const productSchema =new mongoose.Schema({
    name:{
        type:String,
        minlength:[5,"Product Name should be minimum 5 character long."],
        maxlength:[100,"Product Name should be maximum 100 character long."],
        unique:true,
        required:[true,"Product Name is required"],
    },
    description:{
        type:String,
        minlength:[5,"Product Description should be minimum 5 character long."],
        maxlength:[500,"Product Description should be maximum 500 character long."],
        required:[true,"Product Description is required"],
    },
    imageurl:{
        type:[String],
        required:[true,"Product Image URL is required"],
        validate:[greaterThanZero,"Atleast 1 Product Image URL is required"],
    },
    likes:{
        type:Number,
        default:0,
        min:[0,"Minimum Product Like should be 0."],
    },
    dislikes:{
        type:Number,
        default:0,
        min:[0,"Minimum Product Dislikes should be 0."]
    },
    targetgender:{
        type:String,
        enum:[GENDER_ENUM,"Product Target Gender should be one of 'men', 'women', 'kids' or 'unisex' ."],
        required:[true,"Product Target Gender is required."]
    },
    registrationdate:{
        type:Date,
        default:Date
    },
    metal:{
        type:String,
        enum:METAL_ENUM,
        required:[true,"Product Metal type is required."]
    },
    metalweight:{
        type:SchemaTypes.Decimal128,
        validate:[greaterThanZero,"Product Metal Weight should be greater than 0."],
        required:[true,"Product Metal Weight is required."]
    },
    grossweight:{
        type:SchemaTypes.Decimal128,
        validate:[greaterThanZero,function greaterThanMetalweight() {
            return this.metalweight>this.grossweight?false:true;
        },"Product Gross Weight should be greater than 0 and greater than or equal to Product Metal Weight."],
        required:[true,"Product Gross Weight is required."],
    },
    metalpurity:{
        type:String,
        enum:[METAL_PURITY_ENUM,"Product Metal Purity should be one of '18KT', '22KT', '24KT', '100%'."],
        required:[true,"Product Metal Purity is required."]
    },
    makingcharge:{
        type:Number,
        validate:[greaterThanZero,"Product Making Charge should be more than 0."],
        required:[true,"Product Making Charge is required."]
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Categories',
        // ref:'productCategory'
        required:[true,"Product Category is required."]
    }

})