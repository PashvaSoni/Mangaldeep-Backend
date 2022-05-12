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
        required:[true,"Title is required !"],
        minlength:[5,'Title should be more than 5 characters.'],
        maxlength:[50, 'Title should be less than 50 characters.'],
    },
    description:{
        type:String,
        required:[true,"Description is required !"],
        minlength:[10, 'Description should be more than 10 characters.'],
        maxlength:[150, 'Description should be less than 150 characters.']
        
    },
    imageurl:{
        type:String,
        required:[true,"Image Url is required !"]
    },
    enddate:{
        type:Date,
        default:oneMonthFromNow
    }

})

const Offer=mongoose.model('Offer',offerSchema);
export default Offer;