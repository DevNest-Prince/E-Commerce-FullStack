import express from 'express';
import connectDB from './db/db.js';
import bodyParser from 'body-parser';


const app=express();

app.get("/",(req ,res)=>{
    res.send({message:"Welcome to the backend of this E-commerce website"})
})

app.use(bodyParser.json());

import adminRoutes from './routers/AdminRoutes.js'
import sellerRouters from './routers/SellerRoutes.js'
import authRouters from './routers/AuthRoutes.js'


app.use("/auth",authRouters)
app.use("/sellers",sellerRouters)
app.use("/admin",adminRoutes)


const port=5000

app.listen(port,async()=>{
    console.log(`server is running on port ${port}`)
    await connectDB()
})