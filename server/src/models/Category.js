import mongoose from "mongoose";
import { Schema } from "mongoose";

const categorySchema = new Schema({
    name:{
        type:String,
    },
    categoryId:{
        type:String,
        unique:true,
        required:true, //Making categoryID required
    },
    parentCategory:{
        type:Schema.Types.ObjectId,
        ref:"Category",
        default: null,
    },
    level:{
        type:Number,
        required:true,
    },
},{timestamps:true,});

const Category =mongoose.model('Category',categorySchema);

export default Category;