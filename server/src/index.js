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
import userRouters from './routers/UserRoutes.js'
import productRoutes from './routers/ProductRoutes.js'
import sellerProductRoutes from './routers/sellerProductRoutes.js'
import CartRoutes from './routers/CartRoutes.js'
import orderRoutes from './routers/orderRoutes.js'
import sellerOrderRoutes from './routers/sellerOrderRoutes.js'
import PaymentRoutes from './routers/PaymentRoutes.js'
import transactionRoutes from './routers/TransactionRoutes.js'
import sellerReportRoutes from './routers/SellerReportRoutes.js'
import DealRoutes from './routers/DealRoutes.js';
import HomeCategoryRoutes from './routers/HomeCategoryRoutes.js';



app.use("/auth",authRouters)
app.use("/api/users",userRouters)
app.use("/sellers",sellerRouters)

app.use("/products",productRoutes);
app.use("/api/sellers/products",sellerProductRoutes);

app.use("/api/cart",CartRoutes)
app.use("/api/orders",orderRoutes)
app.use("api/seller/orders",sellerOrderRoutes)

app.use('api/payment',PaymentRoutes)
app.use("/api/transactions",transactionRoutes)
app.use("/api/sellers/reports",sellerReportRoutes)

app.use("/admin",adminRoutes)

app.use("/admin/deals",DealRoutes);
app.use("/home",HomeCategoryRoutes);


const port=5000

app.listen(port,async()=>{
    console.log(`server is running on port ${port}`)
    await connectDB()
})