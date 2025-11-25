import mongoose from "mongoose";


const url="mongodb+srv://princekothari016_db_user:nU9a0wWkl1N4dw30@e-commerce-mv.8afchyw.mongodb.net/?appName=E-commerce-MV"

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(url)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        
    } catch (error) {
        console.log(`MongoDB Error:${error}`);
        
    }
}

export default connectDB;