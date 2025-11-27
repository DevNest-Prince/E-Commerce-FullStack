import userServices from "../service/userServices.js";
import UserError from "../errors/UserError.js";

const getUserProfileByJwt = async (req,res) => {
    try {
        const user = await req.user;
        res.status(200).json(user);
    } catch (error) {
        handleError(res, error);
    }
}

const handleError = (res, error) => {
    if (error instanceof Error) {
        res.status(404).json({message: error.message});
    }

    return res.status(500).json({message: "Internal Server Error"});
}

export default {
    getUserProfileByJwt
};