import express from 'express';
const router = express.Router();

import { createOrder } from '../../../controllers/ordersController/create-order-controller'
import { getAllOrders } from '../../../controllers/ordersController/get-all-order-controller'
import { getOrder } from '../../../controllers/ordersController/get-controller'
import { verifyToken } from '../../../middlewares/authenticate';

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getAllOrders);
router.get('/:id', getOrder);


export default router