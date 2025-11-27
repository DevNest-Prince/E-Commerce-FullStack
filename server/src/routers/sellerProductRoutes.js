import express from "express";
import ProductController from "../controllers/ProductController.js";
import sellerMiddleware from "../middlewares/sellerAuthMMiddleware.js";

const router =express.Router();

router.get("/",sellerMiddleware,ProductController.getProductBySellerId);

router.post("/",sellerMiddleware,ProductController.createProduct);

router.delete("/:productId",sellerMiddleware,ProductController.deleteProduct);

// Update a Product

router.patch("/:productId",sellerMiddleware,ProductController.updateProduct);


export default router;



