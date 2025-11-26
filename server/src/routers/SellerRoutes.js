import express from "express";
import SellerController from "../controllers/SellerController.js";
import sellerMiddleware from "../middlewares/sellerAuthMMiddleware.js";

const router = express.Router();


router.get("/profile",sellerMiddleware, SellerController.getSellerProfile);
router.post("/",SellerController.createSeller);
router.get("/",SellerController.getAllSellers);
router.patch("/",sellerMiddleware, SellerController.updateSeller);

router.post("/verify/login-otp",SellerController.verifyLoginOtp)


export default router;
