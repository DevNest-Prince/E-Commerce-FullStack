import express from "express";
import SellerController from "../controllers/SellerController.js";

const router = express.Router();


router.get("/profile",SellerController.getSellerProfile);
router.post("/",SellerController.createSeller);
router.get("/",SellerController.getAllSellers);
router.patch("/",SellerController.updateSeller);

router.post("/verify/login-otp",SellerController.verifyLoginOtp)


export default router;
