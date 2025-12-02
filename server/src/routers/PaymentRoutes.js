import express from "express";
import authMiddleware from "../middlewares/authMidleware.js";
import paymentController from "../controllers/PaymentController.js";

const router = express.Router();


router.get('/:paymentId', authMiddleware, paymentController.paymentHandler);

export default router;