import mongoose from "mongoose";

const {Schema}=mongoose;

const cartSchema=new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    
    cartItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CartItem"
    }],

    totalSellingPrice:{
        type:Number,
        default:0
    },

    totalItem: {
        type: Number,
        default: 0
    },
    totalMrpPrice:{
        type:Number,
        default:0
    },

    discount:{
        type:Number,
        default:0
    },

    couponCode:{
        type:Number,
        default:0
    }

},{timestamps:true})

const Cart=mongoose.model('Cart', cartSchema)

export default Cart;