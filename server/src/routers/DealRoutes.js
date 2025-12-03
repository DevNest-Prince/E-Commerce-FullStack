import express from 'express';
import dealController from '../controllers/dealController.js';

const router = express.Router();

router.get('/', dealController.getAllDeals)

router.post('/', dealController.createDeal)

router.patch('/:id', dealController.updateDeal)

router.delete('/:id', dealController.deleteDeal)

export default router;