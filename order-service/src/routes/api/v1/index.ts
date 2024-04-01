import express from 'express';
const router = express.Router();


import orderRoutes from './ordersRoutes';
import paymentRoutes from './paymentRoutes';
import { webHookRouter } from './webHookRoutes';
import bodyParser from 'body-parser';

router.use('/order', orderRoutes);
router.use('/payment', paymentRoutes);
router.use('/webhook', webHookRouter);



export default router
