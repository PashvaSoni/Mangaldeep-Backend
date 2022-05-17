import mongoose from "mongoose";

// for calculating the one month later date from current date
function oneMonthFromNow() {
    var d = new Date();
    var targetMonth = d.getMonth() + 1;
    d.setMonth(targetMonth);
    if(d.getMonth() !== targetMonth % 12) {
        d.setDate(0); // last day of previous month
    }
    return d;
}

const offerSchema=new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Offer Title is required !"],
        minlength:[5,'Offer Title should be more than 5 characters.'],
        maxlength:[100, 'Offer Title should be less than 100 characters.'],
    },
    description:{
        type:String,
        required:[true,"Offer Description is required !"],
        minlength:[10, 'Offer Description should be more than 10 characters.'],
        maxlength:[250, 'Offer Description should be less than 250 characters.']
        
    },
    imageurl:{
        type:String,
        required:[true,"Offer Image Url is required !"]
    },
    targetlink:{
        type:String,
        required:[true,"Offer Target Link is required !"]
    },
    startdate:{
        type:Date,
        default:Date
    },
    enddate:{
        type:Date,
        default:oneMonthFromNow
    }

})

const Offer=mongoose.model('Offer',offerSchema);
export default Offer;