import express, { NextFunction } from 'express';
export const verifyRouter = express.Router();

import { verifyEmail } from '../../../../src/controllers/verify/email';
import { verifyTokenAndGetUserDetails } from '../../../../src/controllers/verify/loggedin';
import { verifyToken } from '../../../../src/controllers/tokenController/verifyController';

verifyRouter.get('/email/:uid/:otp', verifyEmail)
verifyRouter.get('/loggedin', verifyTokenAndGetUserDetails)
verifyRouter.post('/token', verifyToken)

