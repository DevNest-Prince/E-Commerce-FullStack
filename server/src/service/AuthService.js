import Seller from "../models/Seller.js";
import Verifcationcode from "../models/VerificationCode.js";
import generateOTP from "../utils/generateOtp.js";
import sendVerificationEmail from "../utils/sendEmail.js";

class AuthService{
    async sendLoginOTP(email){

        const SIGNIN_PREFIX="signin_";
        if(email.startsWith(SIGNIN_PREFIX)){
            const seller = await Seller.findOne({email});
            if(!seller) throw new Error ("User Not Found");
        }

        const exitingVerificationCode= await Verifcationcode.findOne({email});

        if(exitingVerificationCode){
            await Verifcationcode.deleteOne({email});
        }

        const otp=generateOTP();
        const varificationCode=new Verifcationcode({otp,email});
        await varificationCode.save();

        // send email to user

        const subject="Your Login OTP for E-commerce Seller Account"
        const body=`Your OTP is ${otp}.Please enter it to complete your login process.`;
        
        await sendVerificationEmail(email, subject, body);

    }

}

export default new AuthService();