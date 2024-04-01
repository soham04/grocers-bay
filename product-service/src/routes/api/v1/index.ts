import express from 'express';
const router = express.Router();

import productRoutes from './productsRoutes';
import cartRoutes from './cartRoutes';

router.use('/product', productRoutes);
router.use('/cart', cartRoutes);


export default router
