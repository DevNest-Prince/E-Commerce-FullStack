import mongoose from "mongoose";
import UserRoles from "../domain/UserRole.js";
import Address from "./Address.js";


const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String
    },

    mobile:{
        type:String
    },

    addresses:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
        }
    ],

    role:{
        type:String,
        enum:[UserRoles.CUSTOMER, UserRoles.ADMIN],
        default:UserRoles.CUSTOMER
    }
})

const User = mongoose.model("User", userSchema);

export default User;