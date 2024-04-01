import express from 'express';
const router = express.Router();

import cartTotal from '../../../controllers/productsController/cart-total-controller'
router.post('/total', cartTotal);

export default router
