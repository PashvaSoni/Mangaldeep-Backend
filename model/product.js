import {mongoose} from "mongoose";
import  SchemaTypes  from "mongoose";
import {productCategory,productClass,productOccasion} from './common.js'

const GENDER_ENUM = ['men','women','kids','unisex'];
const METAL_ENUM = ['gold','silver','platinum','imitation'];
const METAL_PURITY_ENUM = ['18KT','22KT','24KT','100%'];

function greaterThanZero(val) {
    return val >0;
  }

  const categoryExist=async(val)=>{
      const ans= await productCategory.exists({_id:val});
      return ans;
  }

  const classExist=async(val)=>{
      return await productClass.exists({_id:val});
  }

  const occasionExist=async(val)=>{
      return await productOccasion.exists({_id:val});
  }

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
        validate:{
            validator:v => Array.isArray(v) && v.length > 0,
            message:"Atleast one image for the Product is required"
        } 
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
        // enum:[GENDER_ENUM,"Product Target Gender should be one of 'men', 'women', 'kids' or 'unisex' ."],
        enum:{
            values:GENDER_ENUM,
            message:"Product Target Gender should be one of 'men', 'women', 'kids' or 'unisex' ."},
        required:[true,"Product Target Gender is required."]
    },
    registrationdate:{
        type:Date,
        default:Date
    },
    metal:{
        type:String,
        enum:{
            values:METAL_ENUM,
            message:"Product Metal should be one of 'Gold', 'Silver', 'Platinum' or 'Immitation' ."
        },
        required:[true,"Product Metal type is required."]
    },
    metalweight:{
        type:SchemaTypes.Decimal128,
        validate:[greaterThanZero,"Product Metal Weight should be greater than 0."],
        required:[true,"Product Metal Weight is required."]
    },
    grossweight:{
        type:SchemaTypes.Decimal128,
            validate:[
                {
                    validator:greaterThanZero,
                    message:"Product Gross Weight should be more than 0"
                }
            ],
        // validate:[greaterThanZero,async function greaterThanMetalweight() {
        //     return await this.metalweight>this.grossweight?false:true;
        // },"Product Gross Weight should be greater than 0 and greater than or equal to Product Metal Weight."],
        required:[true,"Product Gross Weight is required."],
    },
    metalpurity:{
        type:String,
        // enum:[METAL_PURITY_ENUM,"Product Metal Purity should be one of '18KT', '22KT', '24KT', '100%'."],
        enum:{
            values:METAL_PURITY_ENUM,
            message:"Product Metal Purity should be one of '18KT', '22KT', '24KT', '100%'."
        },
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
        required:[true,"Product Category is required."],
        validate:{
            validator:categoryExist,
            message:props=>`No Product Category with ID : ${props.value} exist`
        }
    },
    class:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Classes',
        required:[true,"Aleast one Product Class is required"],
        validate:[
            {
                validator:v => Array.isArray(v) && v.length > 0,
                message:"Atleast one Product class is required"
            },
            {
                validator:classExist,
                message:props=>`No Product Class with ID : ${props.value} exist`
            }
        ]
    },
    occasion:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Occasions',
        required:[true,"Aleast one Product Occasion is required"],
        validate:[
            {
                validator:v => Array.isArray(v) && v.length > 0,
                message:"Atleast one Product Occasion is required"
            },
            {
                validator:occasionExist,
                message:props=>`No Product Occasion with ID : ${props.value} exist`
            }
        ]
    }

});

// for try to search keywords in prodct name and description
productSchema.index({name:'text',description:'text'});

const Product=mongoose.model('Products',productSchema);

export default Product;