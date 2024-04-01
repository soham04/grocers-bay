import express, { NextFunction } from 'express';
export const customerRouter = express.Router();

import { registerWithFormData } from '../../../controllers/customer/login/register';
import { login } from '../../../controllers/customer/login/login';
import { logout } from '../../../controllers/customer/login/logout';
import { getCustomerDetails } from '../../../controllers/customer/getCustomer';
import { authenticateUser } from '../../../controllers/middlewares/checkAuth';

customerRouter.post('/register', registerWithFormData)
customerRouter.post('/login', login)
customerRouter.get('/logout', logout)

customerRouter.get('/', authenticateUser, getCustomerDetails)


// export default router