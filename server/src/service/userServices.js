import User from "../models/User.js";
import jwtProvider from "../utils/jwtProvider.js";
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

        return user;
    }
}

export default new UserServices();