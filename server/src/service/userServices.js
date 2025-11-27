import User from "../models/User.js";
import jwtProvider from "../utils/jwtProvider.js";
<<<<<<< HEAD
import UserError from "../errors/UserError.js";

class UserServices{

    async findUserProfileByJwt(jwt){
        const email = jwtProvider.getEmailFromjwt(jwt)

        const user = await User.findOne({email})

        if(!user) {
            throw new UserError(`User does not exist ${email}`);
        }

        return user;
    }

    async findUserByEmail(email){
        const user = await User.findOne({email})

        if (!user) {
            throw new UserError(`User does not exist with email: ${email}`);
        }

=======



class UserService{


    async findUserProfileByJwt(jwt){
        const email =jwtProvider.getEmailFromjwt(jwt);
        const user = await User.findOne({email});
        if(!user){
            throw new UserError(`User does not exist with email ${email}`);
        }
        return user;

    }


    async findUserByEmail(email){
        const user =await User.findOne({email});
        if(!user){
            throw new UserException(`User does not exist with email ${email}`);
        }
>>>>>>> 8ef91de7fa8fb9a043d948fb9fd96377043cacf7
        return user;
    }
}

<<<<<<< HEAD
export default new UserServices();
=======

export default new UserService();
>>>>>>> 8ef91de7fa8fb9a043d948fb9fd96377043cacf7
