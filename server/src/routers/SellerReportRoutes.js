import express from "express";
import sellerMiddleware from "../middlewares/sellerAuthMMiddleware.js";
import SellerReportController from "../controllers/SellerReportController.js";

const router = express.Router();

router.get('/', sellerMiddleware, SellerReportController.getSellerReport)

export default router;