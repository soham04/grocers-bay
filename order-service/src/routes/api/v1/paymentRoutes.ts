import express from 'express';
const router = express.Router();

import { createPayment } from '../../../controllers/paymentsController/create-payment-controller'
import { verifyToken } from '../../../middlewares/authenticate';

router.post('/', verifyToken, createPayment);

export default router