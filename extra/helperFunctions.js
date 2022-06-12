import bcrypt from 'bcrypt';

export const generateHash=async(pass)=>{
    try{
        let hashPassword=await bcrypt.hash(pass,12);
        return {success:1,hashPassword:hashPassword,err:null};
    }
    catch(err){
        return {success:1,hashPassword:null,err:err}
    }
}