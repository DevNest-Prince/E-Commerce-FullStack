import Seller from "../models/Seller";
import Verifcationcode from "../models/VerificationCode";

class AuthService{
    async sendLoginOTP(email){

        const seller =await Seller.findOne({email});
        if(!seller) throw new Error ("User NOt found");
        const exitingVerificationCode= await Verifcationcode.findOne({email});
        if(exitingVerificationCode){
            await Verifcationcode.deleteOne({email});
        }

        const otp=generateOTP();
    }

}