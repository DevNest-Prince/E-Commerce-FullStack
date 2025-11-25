import UserRoles from "../domain/UserRole";
import Verifcationcode from "../models/VerificationCode";
import SellerService from "../service/SellerService";
import jwtProvider from "../utils/jwtProvider";

class SellerController{

    // Bearer token

    async getSellerProfile(req,res){
        try {
            const jwt=req.headers.authorization.split(" ")[1]
            const seller=await SellerService.getSellerProfile(jwt);
            res.status(200).json(seller);

            
        } catch (error) {
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message})
        }
    }

    async createSeller(req,res){
        try {
           
            const seller=await SellerService.createSeller(req.body)
            res.status(200).json({message:"seller created succesfully"});

        } catch (error) {
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message})
        }
    }

    async getAllSellers(req,res){
        try {
            const status=req.query.status
            const sellers=await SellerService.getAllSellers(status)
           
            res.status(200).json(sellers);

            
        } catch (error) {
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message})
        }
    }

    async updateSeller(req,res){
        try {
            const existingSeller= await req.seller
            const seller=await SellerService.updateSeller(existingSeller,req.body);
           
            res.status(200).json(seller);

            
        } catch (error) {
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message})
        }
    }

    async deleteSeller(req,res){
        try {
            
            await SellerService.deleteSeller(req.params.id);
           
            res.status(200).json({message:"seller deleted...."});

            
        } catch (error) {
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message})
        }
    }

    async updateSellerAccountStatus(req,res){
        try {
            const updatedSeller=await SellerService.updateSellerStatus(
                req.params.id,
                req.params.status
            )
            res.status(200).json(updatedSeller);

        } catch (error) {
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message})
        }
    }

    async verifyLoginOtp(req,res){
        try {
            const{otp,email}=req.body
            const seller=await SellerService.getSellerByEmail(email);
            const VerificationCode=await Verifcationcode.findOne({email});
            
            if(!VerificationCode || VerificationCode.otp!=otp){
                throw new Error ("Invalid Otp")
            }

            const token=jwtProvider.createJwt({email});
            const authResponse={
                message:"Login Success",
                jwt:token,
                role:UserRoles.SELLER
            }

            return res.status(200).json(authResponse)

        } catch (error) {
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message})
        }
    }
}