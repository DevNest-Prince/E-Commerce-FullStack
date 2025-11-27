import express from "express"
import ProductController from "../controllers/ProductController.js"

const router =express.Router();

// Search For product By Query
router.get('/search',ProductController.searchProduct);

// GET All product with filters
router.get('/',ProductController.getAllProducts);

// GET product by ID
router.get('/:productId',ProductController.getProductById);


export default router;