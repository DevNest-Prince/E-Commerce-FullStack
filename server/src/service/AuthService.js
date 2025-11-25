import Seller from "../models/Seller";
import Verifcationcode from "../models/VerificationCode";
import generateOTP from "../utils/generateOtp";
import sendVerificationEmail from "../utils/sendEmail";

class AuthService{
    async sendLoginOTP(email){

        const SIGIN_PREFIX="signin_";

        if(email.startsWith(SIGIN_PREFIX)){
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

        subject="Your Login OTP for E-commerce Seller Account"
        body=`<p>Your OTP for login is <b>${otp}</b>. It is valid for 10 minutes</p>`
        
        await sendVerificationEmail(email, subject, body);

    }

}