import express from "express";
import authMiddleware from '../middlewares/authMidleware.js'
import orderController from "../controllers/orderController.js";

const router = express.Router();


// Create a new order
router.post('/', authMiddleware, orderController.createOrder);


// Get user's order history
router.get('/user', authMiddleware, orderController.getUserOrderHistory);


// Cancel an order
router.put('/:orderId/cancel', authMiddleware, orderController.cancelOrder);

// Get order by ID
router.get('/:orderId', authMiddleware, orderController.getOrderById);

router.get('/item/:orderItemId', authMiddleware, orderController.getOrderItemById);


export default router;

