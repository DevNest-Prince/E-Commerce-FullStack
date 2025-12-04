import express from 'express';
import HomeCategoryController from '../controllers/HomeCategoryController.js';

const router = express.Router();

router.post('/categories', HomeCategoryController.createHomeCategories);

router.get('/home-category', HomeCategoryController.getHomeCategories);

router.patch('/home-category/:id', HomeCategoryController.updateHomeCategory);

export default router;