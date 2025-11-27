<<<<<<< HEAD
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
=======
const getUserProfileByJwt= async(req ,res)=>{
    try {
        const user =await req.user;
        return res.status(200).json(user);

    } catch (error) {
        handleErrors(err,res);
    }
};

// const getUserByEmail =async(req ,res)=>{
//     const {email}=req.query;
//     try {
//         const user =await UserService.findUserByEmail(email);
//         return res.status(200).json(user)

//     } catch (error) {
//         handleErrors(err,res);
//     }
// };


const handleErrors=(err,res)=>{
    if(err instanceof Error){
        return res.status(404).json({message:err.message});
    }
    return res.status(500).json({message:'Internal Server Error'});
};
>>>>>>> 8ef91de7fa8fb9a043d948fb9fd96377043cacf7

export default {
    getUserProfileByJwt
};