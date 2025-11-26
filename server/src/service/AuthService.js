import Cart from "../models/cart.js";
import Seller from "../models/Seller.js";
import User from "../models/User.js";
import Verifcationcode from "../models/VerificationCode.js";
import generateOTP from "../utils/generateOtp.js";
import jwtProvider from "../utils/jwtProvider.js";
import sendVerificationEmail from "../utils/sendEmail.js";
import bcrypt from "bcryptjs";
import SellerService from "./SellerService.js";
import userServices from "./userServices.js";

class AuthService{
    async sendLoginOTP(email){

        const SIGNIN_PREFIX="signin_";
        if(email.startsWith(SIGNIN_PREFIX)){
            email=email.substring(SIGNIN_PREFIX.length)
            const seller = await Seller.findOne({email})
            const user= await User.findOne({email})
            if(!seller && !user) throw new Error ("User Not Found");
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

    async createUser(req){
        const {email, fullName,otp}=req;

        let user = await User.findOne({email})

        if(user){
            throw new Error ("User already exists with this email");
        }

        const verificationCode=await Verifcationcode.findOne({email});
        if(!verificationCode || verificationCode.otp!==otp){
            throw new Error ("Invalid OTP...");
        }

        user =  new User({
            email,
            fullName
        })

        await user.save();

        const cart = new Cart({user:user._id})
        await cart.save();

        return jwtProvider.createJwt({email});
    }

    async sigin(req){
        const {email,otp}=req;

        const user=await User.findOne({email});
        if(!user){
            throw new Error ("User not found with this email");
        }

        const varificationCode = await Verifcationcode.findOne({email});
        if(!varificationCode || varificationCode.otp!==otp){
            throw new Error ("Invalid OTP");
        }

        return {
            message : "Login Success",
            jwt : jwtProvider.createJwt({email}),
            role : user.role
        }
    }
}

export default new AuthService();