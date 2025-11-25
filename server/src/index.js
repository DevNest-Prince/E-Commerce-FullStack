const express=require('express');
const connectDB = require('./db/db');


const app=express();

app.get("/",(req ,res)=>{
    res.send({message:"Welcome to the backend of this E-commerce website"})
})

const port=5000

app.listen(port,async()=>{
    console.log(`server is running on port ${port}`)
    await connectDB()
})