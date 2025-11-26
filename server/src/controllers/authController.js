import UserRoles from "../domain/UserRole.js";
import AuthService from "../service/AuthService.js";

class AuthController{
    async sendLoginOtp(req,res){
        try {
            const email = req.body.email;
            await AuthService.sendLoginOTP(email);

            res.status(200).json({message:"OTP sent to your email successfully"});

        } catch (error) {
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
        }
    }

    async createUser(req,res){
        try {
            const jwt = await AuthService.createUser(req);

            const res = {
                jwt,
                message : "User created successfully",
                role : UserRoles.CUSTOMER
            }

            res.status(200).json(res);

        } catch (error) {
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
        }
    }


    async sigin(req,res){
        try {
            const res = await AuthService.sigin(req);

            res.status(200).json(res);

        } catch (error) {
            res.status(error instanceof Error ? 404: 500)
            .json({message:error.message});
        }
    }

}

export default new AuthController();