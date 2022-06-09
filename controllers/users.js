import Users from "../model/users.js";

//create new user
export const createUser=async(req,res)=>{
    try{
        const tempUser=new Users(req.body);
        const newUser=await tempUser.save()
        res.status(200).json({success:1,message:"User Created Successfully.",data:newUser});
    }
    catch(err)
    {
        if(err.name === 'MongoServerError' && err.code === 11000)
        {
            res.status(406).json({success:0,message:"User is already registered."});
        }
        else
        {
            res.status(500).json({success:0,message:err.message,data:null});
        }
    }
}

//get user By ID