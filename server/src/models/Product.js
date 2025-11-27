import mongoose from "mongoose"

const productSchema=new mongoose.Schema({
    title:{
        typeof:String,
        required:true,
        trim:true
    },
    desription:{
        typeof:String,
        required:true,
        trim:true
    },
    mrpPrice:{
        typeof:Number,
        required:true,
    },
    sellingPrice:{
        typeof:Number,
        required:true,
    },
    discountPresent:{
        typeof:Number,
        required:true
    },
    quantity:{
        typeof:Number,
        required:true
    },
    colour:{
        typeof:Number,
        required:true
    },
    images:{
        type:[String],
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller",
        required:true
    },
    size:{
        type:String,
        required:true
    }

})

const Product=mongoose.model("Product",productSchema)

export default Product;
