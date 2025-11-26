import express from "express";
import SellerController from "../controllers/SellerController.js";

const router = express.Router();

router.patch("/seller/:id/status/:status",SellerController.updateSellerAccountStatus)

export default router;
