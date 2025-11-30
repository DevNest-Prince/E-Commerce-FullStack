import express from "express";
import orderController from "../controllers/orderController.js";
import sellerMiddleware from "../middlewares/sellerAuthMMiddleware.js";
const router = express.Router();



router.get('/', sellerMiddleware, orderController.getSellersOrders);

// Update order status
router.patch(
    '/:orderId/status/:orderStatus', 
    sellerMiddleware, 
    orderController.updateOrderStatus
);

export default router;
